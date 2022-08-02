import express from 'express'
import { getAllCategory, getCategoryById } from '../controllers/Category.js'

const router = express.Router()

router.get('/', getAllCategory)
router.get('/:id', getCategoryById)

export default router
