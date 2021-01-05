const router = require('express').Router()

const orderService = require('../service/order.service')
const auth = require('../service/auth.service')
const roles = require('../util/roles.enum')

router.get('/me', getUserOrders)
router.get('/', getAllOrders)
router.get('/:id', getOrderById)
router.post('/', createOrder)

function getUserOrders(req, res) {
    return auth.authorizeFunctionToRole(req, res, roles.user, async (req, res) => {
        const orders = await orderService.getOrdersByUserId(req.user.id)
        return res.status(200).json(orders)
    })
}

function getAllOrders(req, res) {
    return auth.authorizeFunctionToRole(req, res, roles.admin, async (req, res) => {
        const orders = await orderService.getAllOrders()
        return res.status(200).json(orders)
    })
}

function getOrderById(req, res) {
    return auth.authorizeFunctionToRole(req, res, roles.user, async (req, res) => {
        const order = await orderService.getOrderById(req.params.id, req.user)
        if (order) {
            return res.status(200).json(order)
        }
        return res.status(404).send('Not found')
    })
}

function createOrder(req, res) {
    return auth.authorizeFunctionToRole(req, res, roles.user, async (req, res) => {
        const orderedProducts = req.body
        const orderId = await orderService.createOrder(orderedProducts, req.user)
        if (orderId) {
            return res.status(200).send(orderId)
        }
        return res.status(500).send('Internal server error')
    })
}

module.exports = { router }
