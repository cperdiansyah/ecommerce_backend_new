// const mongoose = require('mongoose')
import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'

const dbConnect = asyncHandler(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB Connected : ${conn.connection.host}`)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
})

export default dbConnect
// module.exports = dbConnect
