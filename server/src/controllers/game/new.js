const { validationResult } = require('express-validator/check')
const { Game } = require('../../models/game')

/**
 * Crée une nouvelle partie, default à sois même en participants
 * et sa propre team
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { teams, rules } = req.body
  const game = new Game({ teams, rules })

  game.save(err => {
    if (err) {
      return res.status(400).send({
        message: 'Server error at game creation' + err
      })
    }

    return res.status(200).send(game)
  })
}
