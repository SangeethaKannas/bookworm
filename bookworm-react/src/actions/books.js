import  { normalize } from 'normalizr'
import api from '../api'
import { BOOKS_FETCHED, BOOKS_CREATED } from '../types'
import { bookSchema } from '../schemas'

const booksFetched = data => ({
    type: BOOKS_FETCHED,
    data
})

const bookCreated = book => ({
    type: BOOKS_CREATED,
    book
})

export const fetchBooks = () => (dispatch) => 
    api.books.fetchAll().then(books => {
       books && dispatch(booksFetched(normalize(books, [bookSchema])))
    })

export const createBook = (data) => (dispatch) => 
    api.books.create(data).then(book => dispatch(bookCreated(normalize(book, [bookSchema])))  )