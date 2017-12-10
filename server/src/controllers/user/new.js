const { validationResult } = require('express-validator/check')
const bcrypt = require('bcrypt')
const { User } = require('../../models/user')
const { s3, getParamForFile } = require('../../config/aws')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    return res.status(409).send({
      message: 'Cet utilisateur existe déjà'
    })
  }

  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)

  const params = getParamForFile('stella-avatar-user', req.file)
  s3.upload(params, async (err, { Location }) => {
    if (err) {
      return res.status(400).send({
        message: 'Error importing image to AWS'
      })
    }

    try {
      const newUser = new User({
        ...req.body,
        password: hash,
        avatar: Location
      })

      newUser.save(() => {
        return res.status(200).send({
          message: `Utilisateur ${email} created!`
        })
      })
    } catch (e) {
      return res.status(500).send({
        message: 'Erreur lors de l\'ajout d\'une image'
      })
    }
  })
}
