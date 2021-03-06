// const Comment = require('../models/comment');
module.exports = (app, Comment) => {

  // NEW Comment
  app.post('/reviews/comments', (req, res) => {
    // create a new comment
    // const comment = new Comment(req.body);
    // console.log(comment)
      Comment.create(req.body).then((comment) => {
        console.log(comment)
        res.redirect(`/reviews/${comment.reviewId}`);
      }).catch((err) => {
        console.log(err.message);
      });
    });

  app.delete('/reviews/comments/:id', function (req, res) {
    console.log("DELETE comment")
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
      res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    })
  })

}