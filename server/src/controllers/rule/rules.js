const { body } = require('express-validator/check')

const newRule = [
  body('title', 'Un titre est requis')
    .exists()
    .withMessage('Envoie un titre')
    .not()
    .isEmpty()
]

module.exports = {
  newRule
}
