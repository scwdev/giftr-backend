/////////////Newimports///////////////
require("dotenv").config()
require('./models')
const express = require("express")
const rowdy = require("rowdy-logger")
const morgan = require('morgan')
const cors = require("cors")

//App Variables
const PORT = process.env.PORT || 8000 
const app = express();
const rowdyResults = rowdy.begin(app);
const articlesController = require("./controllers/articlesController");
///////////End New Imports/////////////////////////////

/////////////////New Middleware///////////////
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// const checkJwt = require('./middleware/checkJwt')
//////////////End New Middleware/////////////


// Controllers
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

