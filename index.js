import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

import dbConnect from './config/Database.js'
// const dbConnect = require('./config/Database')

/* Routes */
import authRouter from './routes/authRouter.js'

dotenv.config()
const app = express()
dbConnect()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())
app.use(express.json())

/* auth Routes */
app.use(authRouter)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running ${process.env.NODE_ENV} mode on port ${PORT}`)
)
