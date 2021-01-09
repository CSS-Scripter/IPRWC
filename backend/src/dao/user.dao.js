const { openPool } = require('../database/db')

const basicAuthQuery = {text: 
    'SELECT * ' + 
    'FROM users ' +
    'WHERE user_email = $1;'
}
const createUserQuery = {text: 
    'INSERT INTO users(user_name, user_password, user_email, user_role, user_street, user_postal, user_city, user_housenumber) ' + 
    'VALUES($1, $2, $3, \'user\', $4, $5, $6, $7) ' +
    'RETURNING user_id;'
}

async function getUserByEmail(email) {
    const pool = openPool()
    const values = [email]
    const {err, rows} = await pool.query({...basicAuthQuery, values}).catch((err) => {
        return {err, rows: null}
    })

    let user = {}
    if (err) console.error(err)
    else user = rows[0]
    await pool.end()
    return user
}

async function createUser(user) {
    const pool = openPool()
    const values = [user.name, user.password, user.email, user.street, user.postal, user.city, user.housenumber]
    const { err, rows} = await pool.query({...createUserQuery, values}).catch((err) => {
        return {err, rows: null}
    })

    let uuid = ''
    if (err) console.error(err)
    else uuid = rows[0].user_id
    await pool.end()
    return uuid
}

module.exports = { getUserByEmail, createUser }