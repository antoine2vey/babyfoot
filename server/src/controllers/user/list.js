const { User } = require('../../models/user')
const { decode } = require('../../config/jwt')

/**
 * If a user exists in pending invites or friendlist,
 * remove it from possible users list
 */
const removeIfExists = (users, currentUserRequests, friends) => {
  const requests = currentUserRequests.map(req => req.toString())
  const friendlist = friends.map(friend => friend.toString())
  return users.filter(user => {
    if (
      requests.includes(user._id.toString()) ||
      friendlist.includes(user._id.toString())
    ) {
      return false
    }

    return true
  })
}

module.exports = async (req, res) => {
  const { id } = decode(req.get('Authorization'))

  try {
    const { pending_invites, friends } = await User.findById(id)
    const users = await User.find({ _id: { $ne: id } }).select('-password')

    return res.status(200).send({
      users: removeIfExists(users, pending_invites, friends)
    })
  } catch (e) {
    return res.status(500).send({
      message: 'Server error'
    })
  }
}
