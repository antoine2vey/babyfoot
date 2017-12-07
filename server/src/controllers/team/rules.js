const { body, param } = require('express-validator/check')

const newTeamRule = []
const joinTeamRule = [
  param('teamId')
    .exists()
    .isMongoId()
]

module.exports = {
  newTeamRule,
  joinTeamRule
}
