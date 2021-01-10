const router = require('express').Router()
const productService = require('../service/product.service')
const auth = require('../service/auth.service')
const roles = require('../util/roles.enum')

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

function createProduct(req, res) {
    return auth.authorizeFunctionToRole(req, res, roles.admin, async (req, res) => {
        const product = req.body
        const product_id = await productService.createProduct(product)
        if (product_id.trim().length === 0) 
            return res.status(500).send('internal server error')
        return res.status(200).send(product_id)
    })
}

async function updateProduct(req, res) {
    return auth.authorizeFunctionToRole(req, res, roles.admin, async (req, res) => {
        const product = req.body
        product.id = req.params['id']
        const err = await productService.updateProduct(product)
        if (err) return res.status(500).send('internal server error')
        return res.status(200).json({data: 'OK'})
    })
}

async function deleteProduct(req, res) {
    return auth.authorizeFunctionToRole(req, res, roles.admin, async (req, res) => {    
        const err = await productService.deleteProduct(req.params['id'])
        if (err) res.status(500).send('internal server error')
        return res.status(200).json({data: 'OK'})
    })
}



module.exports = { router }