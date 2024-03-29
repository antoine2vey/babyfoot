const { User } = require('../../models/user')
const { decode } = require('../../config/jwt')

/**
 * Asks for friendship
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const { friend_id } = req.params
  const { id } = decode(req.get('Authorization'))

  const user = await User.findByIdAndUpdate(friend_id, {
    $push: { pending_invites: id }
  })

  res.send({
    message: `Frienship request was sent to ${user.email}`
  })
}
