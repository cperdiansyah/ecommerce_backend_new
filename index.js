import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

import dbConnect from './config/Database.js'
// const dbConnect = require('./config/Database')

/* Routes */
import authRouter from './routes/authRouter.js'
import productRouter from './routes/productRouter.js'
import categoryRouter from './routes/categoryRouter.js'

dotenv.config()
const app = express()
dbConnect()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_OPEN || 'http://localhost:3000',
  })
)
app.use(cookieParser())
app.use(express.json())

app.get('/api', function (req, res) {
  res.json(req.cookies)
})
/* auth Routes */
app.use('/api/auth', authRouter)

/* Product Routes */
app.use('/api/product', productRouter)

/* Category Routes */
app.use('/api/category', categoryRouter)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running ${process.env.NODE_ENV} mode on port ${PORT}`)
)
