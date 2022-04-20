import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUserById,
  updateUser,
} from '../controllers/userControler.js'
import { protect, admin } from '../middleware/authMiddleWare.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(authUser)
router
  .route('/:id')
  .delete(protect, deleteUsers)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
