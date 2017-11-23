const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator/check')
const { User } = require('../../models/user')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    const match = await bcrypt.compare(password, user.password)

    if (match) {
      const token = jwt.sign({ user: username }, process.env.JWT_KEY)
      return res.status(200).send({ message: 'Logged in', token })
    } else {
      return res.status(400).send({ message: 'Mauvais identifiants' })
    }
  } catch (e) {
    return res.status(400).send({ message: 'Mauvais identifiants' })
  }
}
