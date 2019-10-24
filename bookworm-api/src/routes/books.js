import express from 'express'
import authenticate from '../middlewares/authenticate'

const router = express.Router()
router.use(authenticate)

router.get('/search', (req, res) => {
    res.status(200).json({
        books: [
            {
                goodReadsId: 1,
                title: "1984",
                authors: "Admin",
                covers: [],
                pages: 100
            },
            {
                goodReadsId: 2,
                title: "Introduction to Javascript",
                authors: "Sangeetha",
                covers: [],
                pages: 100
            }
        ]
    })
})

export default router