const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')
const auth = require('./middleware/auth.middleware')

const userResource = require('./resource/user.resource.js')
const productResource = require('./resource/product.resource')
const orderResource = require('./resource/order.resource')

const app = express()
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyparser.json())
app.use(auth.authenticateToken)

app.use('/', userResource.router)
app.use('/products', productResource.router)
app.use('/orders', orderResource.router)

app.listen(3000, () => console.debug('Listening on port 3000'))