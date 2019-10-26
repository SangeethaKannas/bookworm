import express from 'express'
import { parseString } from 'xml2js'
import authenticate from '../middlewares/authenticate'
import request from 'request-promise'

const router = express.Router()
router.use(authenticate)

router.get('/search', (req, res) => {
    
    request.get(`https://www.goodreads.com/search/index.xml?key=${process.env.GOODREADS_KEY}&q=${req.query.q}`)
    .then(result => {
        parseString(result, (err, goodreadsResult) => {
            res.json({books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map( work => ( {
                goodreadsId: work.best_book[0].id[0]._,
                title: work.best_book[0].title[0],
                authors: work.best_book[0].author[0].name[0],
                covers: [
                    work.best_book[0].image_url[0]
                ]
            }) )})
        })
    })    
}) 

router.get('/fetchPages', (req, res) => {
    const goodReadsId = req.query.goodreadsId


    request.get(`https://www.goodreads.com/book/show.xml?key=${process.env.GOODREADS_KEY}&id=${goodReadsId}`)
    .then(result => {
        parseString(result, (err, goodreadsResult) => {
            res.json({
                pages: goodreadsResult.GoodreadsResponse.book[0].num_pages[0]
            })
        })
    })    
}) 


export default router