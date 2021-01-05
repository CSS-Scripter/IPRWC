const { openPool } = require('../database/db')

const getAllQuery = {text:
    'SELECT * ' +
    'FROM products;'
}

const getSingleQuery = {text:
    'SELECT * ' +
    'FROM products ' +
    'WHERE product_id = $1;'
}

const createProductQuery = {text:
    'INSERT INTO products(product_name, product_description, product_image, product_price)' +
    'VALUES($1, $2, $3, $4) ' +
    'RETURNING product_id;'
}

const updateProductQuery = {text:
    'UPDATE products ' +
    'SET product_name = $1, product_description = $2, product_image = $3, product_price = $4 ' +
    'WHERE product_id = $5;'
}

const deleteProductQuery = {text:
    'DELETE FROM products ' +
    'WHERE product_id = $1;'
}

async function getAllProducts() {
    const pool = openPool()
    const {err, rows} = await pool.query(getAllQuery).catch((err) => {
        return {err, rows: null}
    })

    let products = []
    if (err) console.error(err)
    else products = rows
    await pool.end()
    return products
}

async function getProductById(id) {
    const pool = openPool()
    const values = [id]
    const {err, rows} = await pool.query({...getSingleQuery, values}).catch((err) => {
        return {err, rows: null}
    })

    let product = {}
    if (err) console.error(err)
    else product = rows[0]
    await pool.end()
    return product
}

async function createProduct(product) {
    const pool = openPool()
    const values = [product.name, product.description, product.image, product.price]
    const {err, rows} = await pool.query({...createProductQuery, values}).catch((err) => {
        return {err, rows: null}
    })

    let productId = ''
    if (err) console.error(err)
    else productId = rows[0].product_id
    await pool.end()
    return productId
}

async function updateProduct(product) {
    const pool = openPool()
    const values = [product.name, product.description, product.image, product.price, product.id]
    const {err} = await pool.query({...updateProductQuery, values}).catch((err) => err)
    await pool.end()
    return err
}

async function deleteProduct(id) {
    const pool = openPool()
    const values = [id]
    const {err} = await pool.query({...deleteProductQuery, values}).catch((err) => err)
    await pool.end()
    return err
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct }