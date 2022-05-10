require('dotenv').config();
require('./data/db');
const express = require('express')
const methodOverride = require('method-override')
const { engine } = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Review = require('./models/review');
// mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
const app = express()

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
  { title: "Great Review", movieTitle: "Batman II" },
  { title: "Awesome Movie", movieTitle: "Titanic" }
]

// INDEX
app.get('/', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})
// CREATE
app.post('/reviews', (req, res) => {
  // create a new review
  const Reviews = new Review(req.body);
  // save it to the database
  Reviews.save()
    .then(() => {
      // then redirect to the root route
      res.redirect(`/reviews/${reviews._id}`)
    }).catch(err => {
      console.log(err.message);
      res.status(400).send("Error saving review");
    })
})
// SHOW 
app.get('/reviews', (req, res) => {
 Review.find().lean().then((review) => {
    // console.log(review)
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})
// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {title: 'New Review'});
})
// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id).lean().then((review) => {
    res.render('reviews-edit', { review: review, title: 'Edit Review' })
  }).catch((err) => {
    console.log(err.message);
  })
})
// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${reviews._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})
// SHOW EDITED REVIEW
app.get('/reviews/:id', (req, res) => {
  Review.find().lean().then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})
// DELETE
  app.delete('/reviews/:id', function (req, res) {
    console.log('delete review')
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port 3000!')
}); 

module.exports = app;