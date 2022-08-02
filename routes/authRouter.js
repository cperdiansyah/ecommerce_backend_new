import express from 'express'
import { Login, Logout } from '../controllers/Auth.js'
import refreshToken from '../controllers/RefreshToken.js'

const router = express.Router()

router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

export default router
