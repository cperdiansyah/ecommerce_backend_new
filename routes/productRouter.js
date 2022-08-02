import express from 'express'
import { getProducts, getProductsById } from '../controllers/Products.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductsById)

export default router
