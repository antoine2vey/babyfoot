const express = require('express')
const { validationResult } = require('express-validator/check')
const router = express.Router()

const { jwt } = require('../../config/jwt')
const { newRule } = require('./rules')
const { Rule } = require('../../models/rule')

/**
 * All rules routes
 */
router.post('/', newRule, jwt, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { title, ...rules } = req.body
  const ruleExists = await Rule.findOne({ title })

  if (ruleExists) {
    return res.status(404).send({
      message: 'Règle déjà existante!'
    })
  }

  const rule = new Rule({ title, ...rules })

  rule.save(err => {
    if (err) {
      return res.status(400).send({
        message: 'Mauvais format de règle'
      })
    }

    res.status(200).send({
      message: `Règle ${rule.title} created.`
    })
  })
})

module.exports = router
