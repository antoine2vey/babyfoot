const mongoose = require('mongoose')

const RuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  penalty_out_of_bounds: Boolean,
  max_points: Number,
  max_pissette: Number,
  max_reprise: Boolean,
  can_pissette: Boolean,
  can_gamelle: Boolean,
  can_casquette: Boolean,
  can_rateau: Boolean,
  can_demi: Boolean,
  can_loeb: Boolean
})

module.exports = {
  Rule: mongoose.model('Rule', RuleSchema)
}
