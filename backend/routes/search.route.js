const { SearchForPerson, SearchForMovie, SearchForTV, GetSearchHistory, RemoveFromHistory } = require('../controllers/search.controller')

const router = require('express').Router()

router.get('/person/:query',SearchForPerson)
router.get('/movie/:query',SearchForMovie)
router.get('/tv/:query',SearchForTV)

router.get('/history',GetSearchHistory)
router.delete('/:id/history',RemoveFromHistory)

module.exports = router