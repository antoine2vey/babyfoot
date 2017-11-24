const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const MatchSchema = new mongoose.Schema({
  teamA_players: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  teamB_players: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  teamA_score: Number,
  teamB_score: Number,
  place: {
    type: ObjectId,
    ref: 'Place'
  },
  medias: [String],
  status: {
    type: String,
    default: 'WAITING'
  }
})

module.exports = {
  Match: mongoose.model('Match', MatchSchema)
}
