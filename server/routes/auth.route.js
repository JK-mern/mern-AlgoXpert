import express from 'express'
import { signOut, signin,signup } from '../controllers/auth.controller.js'

const router = express.Router()


router.post('/signin',signin)
router.post('/signup',signup)
router.post('/signout',signOut)

export default router