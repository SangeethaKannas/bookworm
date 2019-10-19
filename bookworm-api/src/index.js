import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import auth from './routes/auth'
import Promise from 'bluebird'
import dotenv from 'dotenv'

const app = express()
app.use(bodyParser.json())

dotenv.config()
mongoose.Promise = Promise
console.log(process.env.MONGODB_URL)
mongoose.connect('mongodb://localhost/bookworm')

app.use('/api/auth', auth)

app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.hhtml'))
})

app.listen(8080, () => console.log('Running on localhost:8080'))