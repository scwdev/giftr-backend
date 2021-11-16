/////////////Newimports///////////////
require("dotenv").config()
require('./db/connection')
const express = require("express")
const rowdy = require("rowdy-logger")
const morgan = require('morgan')
const cors = require("cors")

//App Variables
const PORT = process.env.PORT || 4000 
const app = express();
const rowdyResults = rowdy.begin(app);
///////////End New Imports/////////////////////////////

/////////////////New Middleware///////////////
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// TODO add auth middleware
// const checkJwt = require('./middleware/checkJwt')


// Controllers

// TODO rename controller & models
const articlesController = require("./controllers/articlesController");

app.use('/articles',  require('./controllers/articlesController')) //used to have checkJwt, after '/articles'
// app.use('/auth', require('./controllers/auth'))

// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Hello world!' })
})

// Start the server
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`🌊 Server listening on port ${PORT}`)
})

