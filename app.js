require('dotenv').config();
require('./data/db');
const express = require('express')
const { engine } = require('express-handlebars')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Review = require('./models/review');
// mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
const app = express()

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
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
  res.render('reviews-new', {});
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port 3000!')
}); 

module.exports = app;