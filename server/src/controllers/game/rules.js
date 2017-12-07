const { body, param } = require('express-validator/check')

const newGameRules = [
  body('teams')
    .exists()
    .isMongoId(),
  body('rules').exists()
]

const joinGameRules = [
  param('gameId')
    .exists()
    .isMongoId(),
  body('teamId')
    .exists()
    .isMongoId()
]

const addMediaRules = [param('gameId').exists()]

module.exports = {
  newGameRules,
  joinGameRules,
  addMediaRules
}
