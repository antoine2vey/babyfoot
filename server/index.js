const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const morgan = require('morgan')
const { apiRouter } = require('./src/controllers/index')
const { database } = require('./src/config/database')
const port = process.env.PORT || 3000
const socketManager = require('./src/controllers/game/socketManager')

const http = require('http').Server(app)
const io = require('socket.io')(http)

/**
 * Basic config
 */
database()
socketManager(io)

/**
 * App config
 */
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
