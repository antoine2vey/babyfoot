const { validationResult } = require('express-validator/check')
const bcrypt = require('bcrypt')
const { User } = require('../../models/user')

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

  const newUser = new User({ email, password: hash })
  newUser.save(() => {
    return res.status(200).send({
      message: `Utilisateur ${email} created!`
    })
  })
}
