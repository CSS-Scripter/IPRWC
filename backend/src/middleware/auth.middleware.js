const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config.json')
const userService = require('../service/user.service')

const authorizedPaths = [
    {path: '/products', methods: ['PUT', 'POST']},
]

function authenticateToken(req, res, next) {
    let executed = false
    for (let {path, methods} of authorizedPaths) {
        if (req.originalUrl.startsWith(path) && methods.includes(req.method)) {
            executed = true
            const authHeader = req.headers.authorization
            const token = authHeader && authHeader.split(' ')[1]
            if (token == null) return res.sendStatus(401)

            jwt.verify(token, JWT_SECRET, async (err, user) => {
                if (err) {
                    console.error(err)
                    return res.sendStatus(403)
                }
                req.user = await userService.getUserByEmail(user.email)
                req.user.password = ''
                next()
            })
        }
    }
    if (!executed) next()
}

module.exports = { authenticateToken }