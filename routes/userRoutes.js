import express from 'express'
import verifyToken from '../middleware/VerifyToken'

const router = express.Router()

router.get('/users', verifyToken)
router.post('/users')

export default router
