const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const products = {
    "3554a5ea": {
        "id": "3554a5ea",
        "title": "The Moon",
        "description": "Why not buy some ground on the moon? No more family gatherings for you!",
        "price": 69.69
    },
    "3554a5ee": {
        "id": "3554a5ea",
        "title": "Moon",
        "description": "Why not buy some ground on the moon? No more family gatherings for you!",
        "price": 69.69
    }
}

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors());

app.get('/products', (req, res) => {
    res.status(200).json(products)
})

app.post('/products', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title, description, price } = req.body
    products[id] = {id, title, description, price}
    res.status(200).send(products[id])
})

app.listen(4000, () => {
    console.log('Listening on 4000')
})