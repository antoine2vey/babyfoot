const { Game } = require('../../models/game')

/**
 * Get all games
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const games = await Game.find({})
    .populate('rules', 'title')
    .populate({
      path: 'teams',
      ref: 'Team',
      populate: {
        path: 'members',
        ref: 'User'
      }
    })
    .populate('matches')

  return res.send({ games })
}
