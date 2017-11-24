const mongoose = require('mongoose')

const RuleSchema = new mongoose.Schema({
  penaltyOutOfBounds: Boolean,
  maxPoints: Number,
  maxPissette: Number,
  maxReprise: Boolean,
  canGamelle: Boolean,
  canCasquette: Boolean,
  canRateau: Boolean
})

module.exports = {
  Rule: mongoose.model('Rule', RuleSchema)
}
