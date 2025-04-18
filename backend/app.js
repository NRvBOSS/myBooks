require('dotenv').config()

const express = require('express')
const bookRoutes = require('./routes/bookRoutes')
const router = require('./routes/bookRoutes')
const mongoose = require('mongoose')
const cors = require('cors')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()    
})

// routes
app.use('/api/books', bookRoutes)




// connect to db
mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
        console.log('Connected to db and listening on port', process.env.PORT);
})
  })
  .catch(err => console.log(err))
