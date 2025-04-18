const express = require('express')
const {  
    getAllBooks,
    singleBook,
    newBook,
    deleteBook,
    delAllBooks,
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

// delete all books
router.delete('/', delAllBooks)

// update book
router.patch('/:id', updateBook)

module.exports = router