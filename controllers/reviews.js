const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = function(app, Review) {

  // app.get('/', (req, res) => {
  //   Review.find().lean().then((review) => {
  //   // console.log(review)
  //   res.render('reviews-show', { review: review })
  // }).catch((err) => {
  //   console.log(err.message);
  // })
  // });
  // CREATE
app.post('/reviews', (req, res) => {
  // create a new review
  const Reviews = new Review(req.body);
  // save it to the database
  Reviews.save()
    .then(() => {
      // then redirect to the root route
      res.redirect(`/reviews/${Reviews._id}`)
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
    // fetch comments for this review
    Comment.find({ reviewId: req.params.id }).lean().then((comments) => {
    res.render('reviews-show', { review: review, comments:comments })
  })
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

}