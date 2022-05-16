module.exports = function (app) {

    const { MovieDb } = require('moviedb-promise')
    const moviedb = new MovieDb('1729a87ffd2e76c730db30ce74380342')

    app.get('/', (req, res) => {
        moviedb.movieNowPlaying().then(response => {
            res.render('movies-show', { movies: response.results });
        }).catch(console.error)
    })

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
        moviedb.movieTrailers({ id: req.params.id }).then(videos => {
        movie.trailer_youtube_id = videos.youtube[0].source;
        console.log('VIDEOS.TRAILER_YOUTUBE_ID', movie.trailer_youtube_id);

            res.render('movies-show', { movie: movie });
            }).catch(console.error);
        }).catch(console.error);
    })

}