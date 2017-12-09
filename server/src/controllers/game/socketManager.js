/* eslint-disable no-empty */

const UPDATE_SCORE = 'UPDATE_SCORE'
const INCREMENT_SCORE = 'INCREMENT_SCORE'
const DECREMENT_SCORE = 'DECREMENT_SCORE'
const JOIN_GAME = 'JOIN_GAME'
const { Match } = require('../../models/match')

module.exports = io => {
  io.on('connection', function(socket) {
    console.log(`Client ${socket.id} connected to global namespace`)
    /**
     * socket rooms are created based on the current game room|match id
     */
    socket.on(JOIN_GAME, matchId => {
      console.log('Logged in game')
      socket.join(matchId)
    })

    socket.on(INCREMENT_SCORE, async (matchId, team) => {
      try {
        await Match.findByIdAndUpdate(matchId, {
          $inc: { [`${team}_score`]: 1 }
        })

        io.to(matchId).emit(UPDATE_SCORE, {
          status: 'INCREMENT',
          matchId
        })
      } catch (e) {}
    })

    socket.on(DECREMENT_SCORE, async (matchId, team) => {
      try {
        await Match.findByIdAndUpdate(matchId, {
          $inc: { [`${team}_score`]: -1 }
        })

        io.to(matchId).emit(UPDATE_SCORE, {
          status: 'DECREMENT',
          matchId
        })
      } catch (e) {}
    })
  })
}