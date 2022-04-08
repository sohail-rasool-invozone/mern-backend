import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import connectDb from './config/db.js'

import { notFound, errorHandler } from './middleware/errorMiddleWare.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

connectDb()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('server is running')
})

app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server runnning in ${process.env.NODE_ENV} on port ${port}`)
})
