const express = require('express')
const apiRouter = express.Router()

const userController = require('./user')

/**
 * All entry points
 */
apiRouter.use('/user', userController)

module.exports = { apiRouter }