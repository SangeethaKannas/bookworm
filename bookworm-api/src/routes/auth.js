import express from 'express'
import User from '../models/User'
import { sendResetPasswordEmail } from '../mailer'
import jwt from 'jsonwebtoken'

const router = express.Router()

//TODO:
//Token validity for 24 hours
//Emai after reset password

router.post('/', (request, response) => {
    const { credentials } = request.body
    
    User.findOne({email: credentials.email}).then(user => {        
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
    
    User.findOne({email: req.body.email})
    .then(user => { 
        if( user) {
            sendResetPasswordEmail(user)
            res.json({})
        } else {
            res.status(400).json({errors: { global : "There is no such user with that email"}})
        }
    })
})

router.post('/validate_token', (req, res) => {    

    jwt.verify( req.body.token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
             res.status(401).json({errors: 'Error Invalid Token'})
        } else {
            User.findOne({email: decoded.email}).then(user => {               
                if(user) {
                    res.status(200).json({})
                } else {
                    res.status(401).json({errors: 'Invalid Token'})
                }
            })
        }
    })
})

router.post('/reset_password', (req, res) => {

    const { password, token } = req.body.data    

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
             res.status(401).json({errors: 'Invalid Token'})
        } else {
            User.findOne({_id: decoded.id}).then(user => {
                if(user) {
                    user.setPassword(password)
                    user.save().then(() => res.json({}))
                } else {
                    res.status(401).json({errors: 'Invalid Token'})
                }
            })
        }
    })
})

export default router