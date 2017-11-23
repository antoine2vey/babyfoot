const { validationResult } = require('express-validator/check')
const bcrypt = require('bcrypt')
const { User } = require('../../models/user')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { userId, confirmPassword, newPassword } = req.body

  try {
    const user = await User.findById(userId)
    const sameUser = await bcrypt.compare(confirmPassword, user.password)

    if (sameUser) {
      const salt = await bcrypt.genSalt()
      const password = await bcrypt.hash(newPassword, salt)

      try {
        await User.findByIdAndUpdate(userId, { password })
        return res.status(200).send({
          message: 'Password updated!'
        })
      } catch (e) {
        return res.status(400).send({
          message: 'Utilisateur inconnu'
        })
      }
    }

    return res.status(400).send({
      message: 'Les mots de passe ne correspondent pas'
    })
  } catch (e) {
    return res.status(400).send({
      message: 'Utilisateur inconnu'
    })
  }
}
