import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
dotenv.config()

import dbConnect from './config/Database.js'
// const dbConnect = require('./config/Database')

/* Routes */
import authRouter from './routes/authRouter.js'
import productRouter from './routes/productRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import tokenRouter from './routes/tokenRouter.js'
import cartRouter from './routes/cartRouter.js'
import favoriteRouter from './routes/favoriteRouter.js'

const app = express()
dbConnect()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(
  cors({
    origin: process.env.CORS_OPEN || 'https://ecommerce-next-delta.vercel.app',
    credentials: true,
  })
)
app.use(cookieParser())
app.use(express.json())

app.get('/api', function (req, res) {
  // res.send('Hello World!')
  console.log(req.user)
  return res.status(200).json({ username: req.user })
})

/* auth Token */
app.use('/api/token', tokenRouter)

/* auth Routes */
app.use('/api/auth', authRouter)

/* Product Routes */
app.use('/api/product', productRouter)

/* Cart Routes */
app.use('/api/cart', cartRouter)

/* Favorites Routes */
app.use('/api/favorite', favoriteRouter)


/* Category Routes */
app.use('/api/category', categoryRouter)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running ${process.env.NODE_ENV} mode on port ${PORT}`)
)
