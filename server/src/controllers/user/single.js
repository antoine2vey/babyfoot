const { User } = require('../../models/user')

/**
 * Get all information about one user
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
    .populate('friends', 'email')
    .populate('pending_invites', 'email')
    .select('first_name last_name phone email friends pending_invites')

  return res.status(200).send({ user })
}
