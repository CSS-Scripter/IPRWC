const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const morgan = require('morgan')

const app = express()

const ordersByProductId = {}

app.use(bodyParser.json())
app.use(morgan('tiny'))

app.get('/products/:id/orders', (req, res) => {
    res.status(200).json(ordersByProductId[req.params.id] || [])
})

app.post('/products/:id/orders', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { amount } = req.body
    const orders = ordersByProductId[req.params.id] || []
    orders.push({id, amount})
    ordersByProductId[req.params.id] = orders
    res.status(200).send(ordersByProductId[req.params.id])
})

app.listen(4001, () => {
    console.log('Listening on 4001')
})