import express from 'express'
import { addProductCart, getProductCart } from '../controllers/Products.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

/* Cart */
router.route('/').get(protect, getProductCart)
router.route('/:id').post(protect, addProductCart)

export default router
