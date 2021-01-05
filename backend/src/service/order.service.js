const orderDAO = require('../dao/order.dao')
const productService = require('./product.service')
const auth = require('./auth.service')
const roles = require('../util/roles.enum')

async function getOrdersByUserId(id) {
    const rawOrders = await orderDAO.getOrdersByUserId(id)
    return parseOrders(rawOrders)
}

async function getAllOrders() {
    const rawOrders = await orderDAO.getAllOrders()
    return parseOrders(rawOrders)
}

async function getOrderById(orderId, user) {
    const rawOrder = await orderDAO.getOrderById(orderId)
    const order = parseOrders(rawOrder)
    if (rawOrder[0].user_id === user.id || auth.isUserRequiredRole(user, roles.admin)) {
        return order
    }
    return undefined
}

function createOrder(orderedProducts, user) {
    if (orderedProducts.length == 0) {
        return
    }
    for (let product of orderedProducts) {
        if (product.id.trim().length === 0 || product.amount === 0 ) {
            return
        }
    }
    return orderDAO.createOrder(user, orderedProducts)
}

function parseOrders(rawOrders) {
    const orders = {}
    for (let rawOrder of rawOrders) {
        const orderedProduct = productService.parseProduct(rawOrder)
        orderedProduct.amount = rawOrder.amount
        orders[rawOrder.order_id] = orders[rawOrder.order_id] || {products: [], date: rawOrder.order_date}
        orders[rawOrder.order_id].products.push(orderedProduct)
    }
    return orders
}

module.exports = { getOrdersByUserId, getAllOrders, getOrderById, createOrder }