require('dotenv').config();
require('./data/db');
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser');
const Review = require('./models/review');
const Comment = require('./models/comment');
const app = express()

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + 'public'));

// app.js

const reviews = require('./controllers/reviews')(app, Review);
const comments = require('./controllers/comments')(app, Comment);
const movies = require('./controllers/movies')(app);
// INDEX
// app.get('/', (req, res) => {
//   res.render('reviews-index', { reviews: reviews });
// })

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port 3000!')
}); 

module.exports = app;