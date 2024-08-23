const { GetTrendingTV, GetTVTrailer, GetTVDetails, GetSimilarTVs, GetTVsByCategory } = require('../controllers/tv.controller')

const router = require('express').Router()

router.get('/trending',GetTrendingTV)
router.get('/:id/trailers',GetTVTrailer)
router.get('/:id/details',GetTVDetails)
router.get('/:id/similar',GetSimilarTVs)
router.get('/categories/:category',GetTVsByCategory)

module.exports = router