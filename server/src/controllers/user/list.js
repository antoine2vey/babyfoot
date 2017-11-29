const { User } = require('../../models/user')

module.exports = async (req, res) => {
  try {
    const users = await User.find({}).select('-password')

    return res.status(200).send({
      count: users.length,
      data: users
    })
  } catch (e) {
    return res.status(500).send({
      message: 'Server error'
    })
  }
}
