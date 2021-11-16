const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
content: String,
  image: String
  // imageupload: String,

})

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article