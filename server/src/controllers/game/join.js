const { validationResult } = require('express-validator/check')
const { Game } = require('../../models/game')

/**
 * Rejoinds une partie crée
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const errors = validationResult(req)
  const { teamId } = req.body
  const { id } = req.user
  const { gameId } = req.params

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const joinedGame = await Game.findById(gameId)
  const teams = joinedGame.teams.map(team => team.toString())

  /**
   * Si tu as déjà rejoinds une game
   */
  if (teams.includes(teamId.toString())) {
    return res.status(400).send({
      message: 'Ton équipe est déjà inscrite'
    })
  }

  /**
   * Si la room est déjà pleine
   */
  if (teams.length >= 2) {
    return res.status(400).send({
      message: 'La salle est déjà pleine'
    })
  }

  const game = await Game.findByIdAndUpdate(gameId, {
    $push: { teams: teamId }
  })

  res.send({
    message: 'Bienvenue dans la room',
    game
  })
}
