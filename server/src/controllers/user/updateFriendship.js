const { User } = require('../../models/user')
const { decode } = require('../../config/jwt')

/**
 * Delete friendships, send ACCEPT in req.body.status to accept,
 * DENY to deny it
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const { friend_id } = req.params
  const { status } = req.body
  const { id } = decode(req.get('Authorization'))

  if (status === 'ACCEPT') {
    await User.findByIdAndUpdate(id, {
      $pull: { pending_invites: friend_id },
      $push: { friends: friend_id }
    })
    const acceptedUser = await User.findByIdAndUpdate(friend_id, {
      $push: { friends: id }
    })

    return res.status(200).send({ user: acceptedUser })
  }

  const user = await User.findById(friend_id)
  await User.findByIdAndUpdate(id, {
    $pull: { pending_invites: friend_id }
  })

  return res.status(200).send({ user })
}
