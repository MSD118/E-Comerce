import { Router } from 'express'
import { login, me, signup } from '../controllers/auth.controller'
import { ErrorHandler } from '../error-handler'
import { authMiddleware } from '../middlewares/auth.middleware'

export const authRoutes = Router()

authRoutes.post('/login', ErrorHandler(login))

authRoutes.post('/signup', ErrorHandler(signup))

authRoutes.get('/me', [authMiddleware], ErrorHandler(me))
