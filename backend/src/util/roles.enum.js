const guest = {
    string: undefined,
    access: 0
}

const user = {
    string: 'user',
    access: 1
}

const admin = {
    string: 'admin',
    access: 2
}


function valueOf(roleName) {
    switch (roleName) {
        case 'admin': return admin
        case 'user': return user
        default: return guest
    }
}

module.exports = { guest, user, admin, valueOf }