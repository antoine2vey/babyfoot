const express = require('express')
const router = express.Router()

const { jwt } = require('../../config/jwt')
const { upload } = require('../../config/upload')
const { newTeamRule } = require('./rules')
const newTeam = require('./new')

/**
 * All rules routes
 */
router.post('/', newTeamRule, jwt, upload.single('avatar'), newTeam)

// const { validationResult } = require('express-validator/check')
// const { Team } = require('../../models/team')
// router.post('/join/:teamId', joinTeamRule, jwt, async (req, res) => {
//   const { teamId } = req.params
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() })
//   }

//   const team = await Team.findById(teamId)

//   res.send({
//     team
//   })
// })

module.exports = router
