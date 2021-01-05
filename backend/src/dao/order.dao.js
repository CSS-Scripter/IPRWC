const { openPool } = require('../database/db')

const getOrdersByUserIdQuery = {text:
    'SELECT orders.*, order_products.amount, products.* FROM orders, order_products, products ' +
    'WHERE user_id = $1 ' +
    'AND orders.order_id = order_products.order_id ' +
    'AND order_products.product_id = products.product_id;'
}

const getAllOrdersQuery = {text:
    'SELECT orders.*, order_products.amount, products.* FROM orders, order_products, products ' +
    'WHERE orders.order_id = order_products.order_id ' +
    'AND order_products.product_id = products.product_id;'
}

const getOrderByIdQuery = {text:
    'SELECT orders.*, order_products.amount, products.* FROM orders, order_products, products ' +
    'WHERE orders.order_id = $1 ' +
    'AND orders.order_id = order_products.order_id ' +
    'AND order_products.product_id = products.product_id;'
}

const createOrderQuery = {text: 
    'INSERT INTO orders(user_id) VALUES($1) ' +
    'RETURNING order_id;'
}

const addProductToOrder = {text:
    'INSERT INTO order_products(order_id, product_id, amount) VALUES($1, $2, $3);'
}

async function getOrdersByUserId(id) {
    const pool = openPool()
    const values = [id]
    const {rows} = await pool.query({...getOrdersByUserIdQuery, values}).catch((err) => {return {err, rows: null}})
    await pool.end()
    return rows
}

async function getAllOrders() {
    const pool = openPool()
    const {rows} = await pool.query({...getAllOrdersQuery, values: []}).catch((err) => {return {err, rows: null}})
    await pool.end()
    return rows
}

async function getOrderById(id) {
    const pool = openPool()
    const values = [id]
    const {rows} = await pool.query({...getOrderByIdQuery, values}).catch((err) => {return {err, rows: null}})
    await pool.end()
    return rows
}

async function createOrder(user, orderedProducts) {
    let pool = openPool()
    let values = [user.id]
    const {rows} = await pool.query({...createOrderQuery, values}).catch((err) => {return {err, rows: null}})
    await pool.end()
    pool = openPool()
    const orderId = rows[0].order_id
    for (let product of orderedProducts) {
        values = [orderId, product.id, product.amount]
        const {err} = await pool.query({...addProductToOrder, values})
        if (err) {
            console.err(err.stack)
        }
    }
    await pool.end()
    return orderId

}

module.exports = { getOrdersByUserId, getAllOrders, getOrderById, createOrder }