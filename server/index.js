const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const morgan = require('morgan')
const { apiRouter } = require('./src/controllers/index')
const { database } = require('./src/config/database')
const port = process.env.PORT || 3000

/**
 * Basic config
 */
database()

/**
 * App config
 */
app.use(morgan('tiny'))
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
app.listen(port, () => {
  console.log(`App bootstraped on port ${port} 🚀`)
})
