const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  resetToken: String,
  resetTokenExpire: Date,
  tokens: []
})

module.exports = {
  User: mongoose.model('User', UserSchema)
}