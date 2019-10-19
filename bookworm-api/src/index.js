import express from 'express'
import path from 'path'
import mongoose from 'mongoose'

import bodyparser from 'body-parser'
import auth from './routes/auth'

import dotenv from 'dotenv'

const app = express()

dotenv.config()
mongoose.connect(, {useMongoClient: true})

app.use('/api/auth', auth)
app.use()
app.post('/api/auth', (request, response) => {
    response.status(400).json({errors: {global: "Invalid Credentials"}})
})

app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.hhtml'))
})

app.listen(8080, () => console.log('Running on localhost:8080'))