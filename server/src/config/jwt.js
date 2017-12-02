const jwt = require('express-jwt')
const jwt_decode = require('jwt-decode')

module.exports = {
  jwt: jwt({ secret: process.env.JWT_KEY }),
  decode: token => jwt_decode(token)
}
