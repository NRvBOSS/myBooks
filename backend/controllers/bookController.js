const Book = require('../models/bookModel')

// get all books
const getAllBooks = async (req, res) => {
    const books = await Book.find({}).sort({}) 

    res.status(200).json(books)
}

// get single book
const singleBook = async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        return res.status(404).json({ error: 'No such book' })
    }
    res.status(200).json(book)
}

// post new book
const newBook = async (req, res) => {
    const { title, author, genre, pages, status } = req.body

    if (!title || !author || !genre || !pages || !status) {
        return res.status(400).json({ message: "All fields are required" });
      }

    try{
        const book = await Book.create({ title, author, genre, pages, status })
        res.status(200).json(book)
    }
    catch(error){
        res.status(400).json({ error: error.message })
    }

}

// delete a book
const deleteBook = async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id)

    if (!book) {
        return res.status(404).json({ error: 'No such book' })
    }
    res.status(200).json(book)
    
}

// update book
const updateBook = async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id)

    if(!book){
        return res.status(404).json({ error: 'No such book' })
    }
    res.status(200).json(book)
}


module.exports = {
    getAllBooks,
    singleBook,
    newBook,
    deleteBook,
    updateBook
}