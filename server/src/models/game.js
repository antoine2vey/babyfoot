const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const GameSchema = new mongoose.Schema({
  teams: [
    {
      type: String,
      data: {
        type: ObjectId,
        refPath: 'teams.type'
      }
    }
  ],
  matches: [
    {
      type: ObjectId,
      ref: 'Match'
    }
  ],
  medias: [
    {
      type: ObjectId,
      ref: 'Media'
    }
  ],
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
