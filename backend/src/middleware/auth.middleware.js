const jwt = require('jsonwebtoken')
const userService = require('../service/user.service')
const auth = require('../service/auth.service')

async function authenticateToken(req, res, next) {
    let executed = false
    executed = true
    const authHeader = req.headers.authorization
    if (authHeader) {
        const [authMethod, token] = authHeader && authHeader.split(' ')
        if (token == null || authMethod == 'Basic') return next()

        const email = (auth.verifyToken(token) || {}).email
        if (email) {
            req.user = await userService.getUserByEmail(email)
            req.user.password = ''
        }
    }
    return next()
}

module.exports = { authenticateToken }