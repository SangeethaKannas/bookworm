import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Promise from 'bluebird'
import dotenv from 'dotenv'

import auth from './routes/auth'
import users from './routes/users'
import books from './routes/books'

const app = express()
app.use(bodyParser.json())

dotenv.config()
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/bookworm')

app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/books', books)

app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'))
})

const PORT = 8080

app.listen(PORT, () => console.log('Running on localhost:' + PORT))