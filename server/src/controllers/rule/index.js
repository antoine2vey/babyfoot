const express = require('express')
const { validationResult } = require('express-validator/check')
const router = express.Router()

const { jwt } = require('../../config/jwt')
const { newRule } = require('./rules')
const { Rule } = require('../../models/rule')

const { s3, getParamForFile } = require('../../config/aws')
const { upload } = require('../../config/upload')

/**
 * All rules routes
 */
router.post('/', jwt, upload.single('icon'), async (req, res) => {
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

  const params = getParamForFile('stella-rules', req.file)
  s3.upload(params, async (err, { Location }) => {
    if (err) {
      return res.status(400).send({
        message: 'Error importing image to AWS'
      })
    }

    const rule = new Rule({
      title,
      icon: Location,
      ...rules
    })

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
})

router.get('/', jwt, upload.single('icon'), async (req, res) => {
  try {
    const rules = await Rule.find({})

    return res.status(200).send({ rules })
  } catch (e) {
    return res.status(500).send({
      message: 'Erreur serveur, réessayez plus tard!',
      stack: e.stack
    })
  }
})

module.exports = router
