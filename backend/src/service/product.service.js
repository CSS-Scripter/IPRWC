const productDAO = require('../dao/product.dao')

async function getAllProducts() {
    const parsedProducts = []
    const products = await productDAO.getAllProducts()
    for (let product of products) {
        parsedProducts.push(parseProduct(product))
    }
    return products
}

async function getProductById(id) {
    return parseProduct(await productDAO.getProductById(id))
}

async function createProduct(product) {
    if (validateProduct(product)) {
        return productDAO.createProduct(product)
    } else {
        return ''
    }
}

async function updateProduct(product) {
    const baseProduct = await getProductById(product.id)
    const updatedProduct = {...baseProduct, ...product}
    return productDAO.updateProduct(updatedProduct)
}

function deleteProduct(id) {
    return productDAO.deleteProduct(id)
}

function validateProduct(product) {
    let valid = true
    const fields = ['name', 'description', 'image']
    for (let field of fields) {
        if (product[field].trim().length === 0) {
            valid = false
            break
        }
    }
    return valid
}

function parseProduct(product) {
    return {
        id: product.product_id,
        name: product.product_name,
        description: product.product_description,
        image: product.product_image,
        price: product.product_price
    }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, parseProduct }