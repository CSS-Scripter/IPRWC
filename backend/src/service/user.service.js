const bcrypt = require('bcrypt')
const userDAO = require('../dao/user.dao')

async function getUserByBasicAuth(email, password) {
    const user = await getUserByEmail(email)
    if (bcrypt.compareSync(password, user.password)) {
        return user
    }
    return null
}

async function getUserByEmail(email) {
    const user = await userDAO.getUserByEmail(email)
    return parseUser(user)
}

function parseUser(sqlUser) {
    return {
        id: sqlUser.user_id,
        name: sqlUser.user_name, 
        password: sqlUser.user_password, 
        email: sqlUser.user_email, 
        role: sqlUser.user_role
    }
}

function registerUser(user) {
    let valid = true
    const fields = ['name', 'password', 'email']
    for (let field of fields) {
        if (field.trim().length === 0) {
            valid = false
            break
        }
    }
    if (valid) {
        user.password = bcrypt.hashSync(user.password, 10)
        return userDAO.createUser(user)
    } else {
        return ''
    }
}

module.exports = {getUserByEmail, getUserByBasicAuth, registerUser }