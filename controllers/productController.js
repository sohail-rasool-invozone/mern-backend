import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route get/api/products
// @access pulblic route

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc Fetch single product
// @route get/api/products/:id
// @access pulblic route

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc delete product
// @route delete/api/products/:id
// @access admin route

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc create product
// @route post/api/products
// @access admin route

const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    user: req.user._id,
    name: 'Sample Name',
    description: 'Sample Description',
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample category',
    price: 0,
    countInStock: 0,
    numReviews: 0,
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc update product
// @route put/api/products/:id
// @access admin route

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    price,
    countInStock,
    numReviews,
    image,
  } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.price = price
    product.countInStock = countInStock
    product.numReviews = numReviews
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
