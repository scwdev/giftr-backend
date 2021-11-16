const router = require('express').Router();
const db = require('../models');

// BASE ROUTE - /api/articles
// Actual route - GET /api/articles
//Return data for all articles

router.get('/', (req, res) => {
  db.Article.find({}, (err, foundArticles) => {
    if (err) return console.log(err);
    res.json(foundArticles);
  });
});

// actual route - GET /api/articles/:id
router.get('/:id', (req, res) => {
  db.Article.findById(req.params.id, (err, foundArticle) => {
      if (err) return console.log(err);
    res.json(foundArticle);
  });
});

// actual route - POST /api/articles
router.post('/', (req, res) => {
  const newArticle = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image ? req.body.image : req.body.imageupload
  }
  db.Article.create(newArticle, (err, savedArticle) => {
    console.log(newArticle)  
    console.log('hello from post')
    if (err) return console.log(err);
    
    res.json(savedArticle);
  });
});

// actual route - PUT /api/articles/:id
router.put('/:id', (req, res) => {
  db.Article.findByIdAndUpdate(
    req.params.id, // finds the Article with id passed in from URL
    req.body, // passes in data to update a Article from the req.body
    {new: true}, // We want to updated Article returned in the callback
    (err, updatedArticle) => { // function called after update completes
      if (err) return console.log(err);
      
      res.json(updatedArticle);
    });
});

// actual route - DELETE /api/articles/:id
router.delete('/:id', (req, res) => {
  console.log('delete route')
  db.Article.findByIdAndDelete(req.params.id, (err, deletedArticle) => {
    if (err) return console.log(err);
    res.json({ messaage:'Successful deletion' });
  });
});

module.exports = router;
