const express = require('express')
const router = express.Router()

const { jwt } = require('../../config/jwt')
const { upload } = require('../../config/upload')

const joinGame = require('./join')
const listGames = require('./list')
const newGame = require('./new')
const addMediaToGame = require('./addMedia')

const { joinGameRules, newGameRules, addMediaRules } = require('./rules')

/**
 * Game interface for API
 */
router.get('/', jwt, listGames)
router.post('/', jwt, newGameRules, newGame)
router.post('/join/:gameId', jwt, joinGameRules, joinGame)
router.put(
  '/medias/:gameId',
  jwt,
  addMediaRules,
  upload.single('media'),
  addMediaToGame
)

module.exports = router
