import mongoose from 'mongoose'
import dotenv from 'dotenv'

import users from './data/users.js'
import products from './data/products.js'
import categories from './data/categories.js'

import User from './models/UserModel.js'
import Product from './models/ProductModels.js'
import Category from './models/CategoryModels.js'

import connectDb from './config/Database.js'

dotenv.config()
connectDb()

const importData = async () => {
  try {
    await User.deleteMany({})
    await Product.deleteMany({})
    await Category.deleteMany({})

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    await Category.insertMany(categories)

    const sampleProduct = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      }
    })

    await Product.insertMany(sampleProduct)

    console.log('Data Imported...')
    process.exit(0)
  } catch (error) {
    console.log('Error: ', error)
    process.exit()
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany({})
    await Product.deleteMany({})
    await Category.deleteMany({})

    console.log('Data Destroyed...')
    process.exit(0)
  } catch (error) {
    console.log('Error: ', error)
    process.exit()
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
