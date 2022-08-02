import express from 'express'
import { Login, Logout } from '../controllers/Users'
import verifyToken from '../middleware/VerifyToken'
import refreshToken from '../controllers/RefreshToken'

const router = express.Router()

router.get('/users', verifyToken)
router.post('/users' )
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

export default router
