const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  mail: String,
  telephone: String,
  auth_type: String,
  resetToken: String,
  resetTokenExpire: Date,
  tokens: [],
  pending_invites: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  friends: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  place: {
    type: ObjectId,
    ref: 'Place'
  }
})

module.exports = {
  User: mongoose.model('User', UserSchema)
}
