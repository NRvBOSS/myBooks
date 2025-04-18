// create schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    pages:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['completed', 'reading', 'not started'],
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Book', bookSchema)