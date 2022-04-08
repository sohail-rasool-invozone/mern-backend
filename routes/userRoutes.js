import express from 'express'
import { authUser } from '../controllers/userControler.js'

const router = express.Router()

router.route('/login').post(authUser)

export default router
