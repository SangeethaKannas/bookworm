import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Promise from 'bluebird'
import dotenv from 'dotenv'

import auth from './routes/auth'
import users from './routes/users'
import books from './routes/books'

//Global Variables
const app = express()
const PORT = process.env.port || 8080
const log = console.log

mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/bookworm')

dotenv.config()

app.use(bodyParser.json())
app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/books', books)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ))

    app.get('/*', (request, response) => {
        response.sendFile(path.join(__dirname, '..', 'bookworm-react', 'build', 'index.html'))
    })
    
}

app.listen(PORT, () => log('Running on localhost:' + PORT))