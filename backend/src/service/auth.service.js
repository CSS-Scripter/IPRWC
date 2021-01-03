const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config.json')

function generateToken(email) {
    return jwt.sign(email, JWT_SECRET, { expiresIn: '1800s'})
}

module.exports = { generateToken }