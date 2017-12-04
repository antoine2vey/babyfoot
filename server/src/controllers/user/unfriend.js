const { User } = require('../../models/user')
const { decode } = require('../../config/jwt')

/**
 * Deletes a friendship
 */
module.exports = async (req, res) => {
  const { friend_id } = req.params
  const { id } = decode(req.get('Authorization'))

  await User.findByIdAndUpdate(id, { $pull: { friends: friend_id } })
  const user = await User.findByIdAndUpdate(friend_id, {
    $pull: { friends: id }
  })

  res.status(200).send({ user })
}
