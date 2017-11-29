const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator/check')
const { User } = require('../../models/user')
const errorMaker = require('../../utils/errors')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email }).select(
      '-resetToken -resetTokenExpire -tokens'
    )
    const match = await bcrypt.compare(password, user.password)

    if (match) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.JWT_KEY
      )
      return res.status(200).send({ message: 'Logged in', token })
    } else {
      return res
        .status(400)
        .send({ errors: errorMaker('Mauvais identifiants') })
    }
  } catch (e) {
    return res.status(400).send({ errors: errorMaker('Mauvais identifiants') })
  }
}
