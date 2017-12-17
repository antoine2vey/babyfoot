const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const GameSchema = new mongoose.Schema({
  teams: [
    {
      type: ObjectId,
      ref: 'Team'
    }
  ],
  matches: [
    {
      type: ObjectId,
      ref: 'Match'
    }
  ],
  medias: [String],
  rules: [
    {
      type: ObjectId,
      ref: 'Rule'
    }
  ],
  created_at: {
    type: Date,
    default: new Date()
  },
  pending_invites: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  location: {
    name: String,
    lat: Number,
    lng: Number
  },
  status: {
    type: String,
    default: 'WAITING'
  }
})

module.exports = {
  Game: mongoose.model('Game', GameSchema)
}
