const mongoose = require('mongoose')

const StatSchema = new mongoose.Schema({
  type: String,
  counter: Number,
  date_time: {
    type: Date,
    default: new Date()
  }
})

module.exports = {
  Stat: mongoose.model('Stat', StatSchema)
}
