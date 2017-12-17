const { validationResult } = require('express-validator/check')
const { Game } = require('../../models/game')
const axios = require('axios')
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

  const { team, rules, place } = req.body
  const key = 'AIzaSyDEa5_d3q2c0E6lr3YFlFWro0A0pntLkt4'
  const resultCall = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${key}`
  )
  const result = resultCall.data.results[0]
  const latLng = result.geometry.location

  const getAddress = components => {
    let address = []

    if (components[0].types[0] === 'street_number') {
      address.push(components[0].long_name)
    }

    address.push(components[1].long_name)
    address.push(components[2].long_name)

    return address.join(' ')
  }

  const game = new Game({
    teams: [team],
    location: {
      name: getAddress(result.address_components),
      ...latLng
    },
    rules
  })

  game.save(err => {
    if (err) {
      return res.status(400).send({
        message: 'Server error at game creation' + err
      })
    }

    return res.status(200).send(game)
  })
}
