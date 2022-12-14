import express from 'express'
import {
  getProducts,
  getProductsById,
} from '../controllers/Products.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

/* Products */
router.get('/', getProducts)
router.get('/:id', getProductsById)



export default router
