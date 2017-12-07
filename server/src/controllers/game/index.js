const express = require('express')
const router = express.Router()
const { jwt } = require('../../config/jwt')

const { Game } = require('../../models/game')

/**
 * All user possible routes
 */
router.post('/', jwt, async (req, res) => {
  const { teams, rules } = req.body
  const { id } = req.user

  const game = new Game({
    teams,
    rules,
    participants: id
  })

  game.save(err => {
    if (err) {
      return res.status(400).send({
        message: 'Server error at game creation' + err
      })
    }

    return res.status(200).send(game)
  })
})

router.get('/', jwt, async (req, res) => {
  const games = await Game.find({})
    .populate('participants', '-password')
    .populate('rules')
    .populate('teams')

  return res.send({ games })
})

module.exports = router
