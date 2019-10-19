import express from 'express'
import User from '../models/User'

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

export default router