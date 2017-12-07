const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const morgan = require('morgan')
const { apiRouter } = require('./src/controllers/index')
const { database } = require('./src/config/database')
const port = process.env.PORT || 3000

const http = require('http').Server(app)
const io = require('socket.io')(http)

/**
 * Basic config
 */

database()

/**
 * App config
 */
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * socket.io
 */
const UPDATE_SCORE = 'UPDATE_SCORE'
const INCREMENT_SCORE = 'INCREMENT_SCORE'
const DECREMENT_SCORE = 'DECREMENT_SCORE'
const JOIN_GAME = 'JOIN_GAME'

io.on('connection', function(socket) {
  console.log(`Client ${socket.id} connected to global namespace`)
  /**
   * socket rooms are created based on the current game room|match id
   */
  socket.on(JOIN_GAME, gameId => {
    socket.join(gameId)
  })

  socket.on(INCREMENT_SCORE, async gameId => {
    io.to(gameId).emit(UPDATE_SCORE, {
      status: 'INCREMENT',
      gameId
    })
  })

  socket.on(DECREMENT_SCORE, gameId => {
    io.to(gameId).emit(UPDATE_SCORE, {
      status: 'DECREMENT',
      gameId
    })
  })
})

/**
 * Main API route
 */
app.use('/api', apiRouter)
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Route not found!' })
})

/**
 * Server startup
 */
http.listen(port, () => {
  console.log(`App bootstraped on port ${port} 🚀`)
})
