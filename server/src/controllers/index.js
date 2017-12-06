const express = require('express')
const apiRouter = express.Router()

const userController = require('./user')
const gameController = require('./game')
const ruleController = require('./rule')
const teamController = require('./team')

/**
 * All API entry points
 */
apiRouter.use('/user', userController)
apiRouter.use('/game', gameController)
apiRouter.use('/rule', ruleController)
apiRouter.use('/team', teamController)

module.exports = { apiRouter }
