const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  resetToken: String,
  resetTokenExpire: Date,
  tokens: [],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

module.exports = {
  User: mongoose.model('User', UserSchema)
}
