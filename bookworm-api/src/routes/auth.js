import express from 'express'
import User from '../models/User'
import { sendResetPasswordEmail } from '../mailer'

const router = express.Router()

router.post('/', (request, response) => {
    const { credentials } = request.body
    
    User.findOne({email: credentials.email}).then(user => {
        console.log(user)
        if(user && user.isValidPassword(credentials.password)) {
            response.json({loginJWT: user.generateJWT() })
        } else {
            response.status(400).json({errors: { global: "Invalid Credentials" } } )
        }
    })    
})

router.post('/confirmation', (req, res) => {
    const token = req.body.token

    User.findOneAndUpdate(
        {confirmationToken: token},
        {confirmationToken: '', confirmed: true},
        {new: true}
    ).then(user => user ? res.json({user: user.toAuthJSON()}) : res.status(400).json( {} ) )
})

router.post('/reset_password_request', (req, res) => {
    console.log(req.body.email.email)
    User.findOne({email: req.body.email.email})
    .then(user => { 
        if( user) {
            sendResetPasswordEmail(user)
            res.json({})
        } else {
            res.status(400).json({errors: { global : "There is no such user with that email"}})
        }
    })

})

export default router