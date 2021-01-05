const jwt = require('jsonwebtoken')
const roles = require('../util/roles.enum')
const {JWT_SECRET} = require('../config.json')

function generateToken(email) {
    return jwt.sign(email, JWT_SECRET, { expiresIn: '1800s'})
}

function authorizeFunctionToRole(req, res, role, action) {
    if (isUserRequiredRole(req.user, role)) {
        return action(req, res)
    }
    return handleUnauthorized(req, res)
}

function isUserRequiredRole(user, requiredRole) {
    return getUserRole(user).access >= requiredRole.access
}

function getUserRole(user) {
    return roles.valueOf((user || {}).role)
}

function handleUnauthorized(req, res) {
    if (getUserRole(req)) {
        return res.status(403).send('forbidden')
    }
    return res.status(401).send('unauthorized')
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch(err) {
        console.error(err.stack)
    }
}

module.exports = { generateToken, authorizeFunctionToRole, verifyToken, isUserRequiredRole }