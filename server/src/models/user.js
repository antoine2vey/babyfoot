const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  telephone: String,
  password: String,
  auth_type: String,
  reset_token: String,
  reset_token_expire: Date,
  tokens: [],
  fbId: String,
  avatar: String,
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
