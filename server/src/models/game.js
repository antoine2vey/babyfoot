const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isStarted: {
    type: Boolean,
    default: false
  },
  isDone: {
    type: Boolean,
    default: false
  }
})

module.exports = {
  Game: mongoose.model('Game', GameSchema)
}
