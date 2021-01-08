const router = require('express').Router()

const auth = require('../service/auth.service')
const userService = require('../service/user.service')
const roles = require('../util/roles.enum')

router.get('/login', login)
router.post('/register', register)
router.get('/check-token', checkToken)

async function login(req, res) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).send('Missing Authorization Header')
    }
    const base64Credentials = req.headers.authorization.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const user = await userService.getUserByBasicAuth(...credentials.split(':'))
    if (user == null) {
        return res.status(401).send('Invalid Authorization Credentials')
    }
    return res.status(200).send(auth.generateToken({email: user.email}))
}

async function register(req, res) {
    const user = req.body
    const uuid = await userService.registerUser(user)
    console.log(uuid)
    if (uuid.trim().length === 0) {
        return res.status(500).send('internal server error')
    }
    return res.status(200).send(uuid)
}

function register(req, res) {
    return auth.authorizeFunctionToRole(req, res, roles.user, (req, res) => {
        if (req.user) {
            return res.status(200).send('valid')
        }
        return res.status(401).send('invalid')
    })
}


module.exports = { router }
