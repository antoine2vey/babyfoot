const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

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
