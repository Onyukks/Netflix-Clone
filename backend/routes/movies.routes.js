const { GetTrendingMovie, GetMovieTrailer, GetMovieDetails, GetSimilarMovies, GetMoviesByCategory } = require('../controllers/movies.controller')
const router = require('express').Router()

router.get('/trending',GetTrendingMovie)
router.get('/:id/trailers',GetMovieTrailer)
router.get('/:id/details',GetMovieDetails)
router.get('/:id/similar',GetSimilarMovies)
router.get('/categories/:category',GetMoviesByCategory)

module.exports = router