const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI 

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.once('open', () => {
    console.log(`⛓️ Mongoose connected @ ${db.host}:${db.port}`)
})
db.on('error', err => {
    console.error("Could not connect to Mongo DB!",err)
})
module.exports = {
  Article: require ('./Article')
//   User: require('./User')
};
