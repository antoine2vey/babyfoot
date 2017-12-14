const { User } = require('../../models/user')

/**
 * Get all information about one user
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const { id } = req.user
  const user = await User.findById(id)
    .populate('friends', '-password')
    .populate('pending_invites', '-password')
    .select('first_name last_name phone email friends pending_invites')

  return res.status(200).send({ user })
}
