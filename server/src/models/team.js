const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const TeamSchema = new mongoose.Schema({
  members: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  name: String,
  logo: String
})

module.exports = {
  Team: mongoose.model('Team', TeamSchema)
}
