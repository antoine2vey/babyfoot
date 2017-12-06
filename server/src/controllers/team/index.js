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

module.exports = router
