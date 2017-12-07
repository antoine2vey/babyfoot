const { Game } = require('../../models/game')

/**
 * Debug
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
  const games = await Game.find({})
    .populate('rules')
    .populate('teams')

  return res.send({ games })
}
