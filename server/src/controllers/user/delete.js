const { validationResult } = require('express-validator/check')
const { User } = require('../../models/user')

module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { userId } = req.body

  try {
    const user = await User.findByIdAndRemove(userId)

    if (!user) {
      return res.status(400).send({
        message: "Cet utilisateur n'existe pas"
      })
    }

    return res.status(200).send({
      message: `Utilisateur ${user.username} supprimé!`
    })
  } catch (e) {
    return res.status(400).send({
      message: "Cet utilisateur n'existe pas"
    })
  }
}
