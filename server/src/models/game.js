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
  participants: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ]
})

module.exports = {
  Game: mongoose.model('Game', GameSchema)
}
