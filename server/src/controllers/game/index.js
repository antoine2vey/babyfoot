const express = require('express')
const router = express.Router()
const { jwt } = require('../../config/jwt')

/**
 * All user possible routes
 */
router.get('/', async (req, res) => {
  res.send({
    test: 'foo'
  })
})

module.exports = router
