import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

// @desc Fetch all products
// @route get/api/products
// @access pulblic route

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    name: { $regex: req.query.keyword, $options: "i" },
  })
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
    throw new Error("Product not found")
  }
})

// @desc delete product
// @route delete/api/products/:id
// @access admin route

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc create product
// @route post/api/products
// @access admin route

const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    user: req.user._id,
    name: "Sample Name",
    description: "Sample Description",
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample category",
    price: 0,
    countInStock: 0,
    numReviews: 0,
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc update product
// @route put/api/products/:id
// @access admin/private route

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
    throw new Error("Product not found")
  }
})

// @desc Create new review
// @route post/api/products/:id/review
// @access private route

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviews = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )
    if (alreadyReviews) {
      res.status(400)
      throw new Error("Product already reviewd")
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: "Review Added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
}
