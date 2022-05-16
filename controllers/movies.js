module.exports = function (app) {

    const { MovieDb } = require('moviedb-promise')
    const moviedb = new MovieDb('1729a87ffd2e76c730db30ce74380342')

    app.get('/', (req, res) => {
        moviedb.movieNowPlaying().then(response => {
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
    })

}