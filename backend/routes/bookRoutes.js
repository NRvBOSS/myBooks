const express = require('express')
const {  
    getAllBooks,
    singleBook,
    newBook,
    deleteBook,
    updateBook
} = require('../controllers/bookController')
const router = express.Router()

// get all books
router.get('/', getAllBooks)

// get a single book
router.get('/:id', singleBook)

// post new book
router.post('/', newBook)

// delete book
router.delete('/:id', deleteBook)

// update book
router.patch('/:id', updateBook)

module.exports = router