const express = require('express')
const router = express.Router()

const { jwt } = require('../../config/jwt')
const { Match } = require('../../models/match')
const { Game } = require('../../models/game')

/**
 * Game interface for API
 */
router.post('/', jwt, async (req, res) => {
  const { gameId } = req.body

  const game = await Game.findById(gameId).populate('teams')
  const [teamA, teamB] = game.teams

  const newGame = new Match({
    teamA_players: teamA.members,
    teamB_players: teamB.members
  })

  newGame.save(async err => {
    if (err) {
      return res.status(400).send({
        message: 'Cannot create game'
      })
    }

    await Game.findByIdAndUpdate(gameId, { $push: { matches: newGame.id } })
    return res.status(200).send({ newGame })
  })
})

router.get('/:matchId', jwt, async (req, res) => {
  const match = await Match.findById(req.params.matchId)
    .populate('teamB_players')
    .populate('teamA_players')

  res.send({ match })
})

module.exports = router
