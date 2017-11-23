const jwt = require('express-jwt')

module.exports = { jwt: jwt({ secret: process.env.JWT_KEY }) }
