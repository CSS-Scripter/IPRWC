const router = require('express').Router()
const productService = require('../service/product.service')

router.get('/', getAllProducts)
router.post('/', createProduct)
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

async function getAllProducts(req, res) {
    const products = await productService.getAllProducts()
    return res.status(200).json(products)
}

async function getProductById(req, res) {
    const product = await productService.getProductById(req.params['id'])
    return res.status(200).json(product)
}

async function createProduct(req, res) {
    if (req.user.role !== 'admin') {
        res.status(403).send('forbidden')
    } else {
        const product = req.body
        const product_id = await productService.createProduct(product)
        if (product_id.trim().length === 0) 
            return res.status(500).send('internal server error')
        return res.status(200).send(product_id)
    }
}

async function updateProduct(req, res) {
    if (req.user.role !== 'admin') {
        res.status(403).send('forbidden')
    } else {
        const product = req.body
        product.id = req.params['id']
        const err = await productService.updateProduct(product)
        if (err) return res.status(500).send('internal server error')
        else return res.status(200).send('OK')
    }
}

async function deleteProduct(req, res) {
    if (req.user.role !== 'admin') {
        res.status(403).send('forbidden')
    } else {
        res.status(200).send('OK')
    }
}

module.exports = { router }