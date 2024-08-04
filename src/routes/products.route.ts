import { Router } from 'express'
import {
  createProduct,
  createProducts,
  deleteProduct,
  listProducts,
  updateProduct,
} from '../controllers/products.controller'
import { ErrorHandler } from '../error-handler'
import { authMiddleware } from '../middlewares/auth.middleware'
import { adminMiddleware } from '../middlewares/admin.middleware'

export const productsRoutes: Router = Router()

productsRoutes.post(
  '/',
  [authMiddleware, adminMiddleware],
  ErrorHandler(createProduct)
)

productsRoutes.post(
  '/many',
  [authMiddleware, adminMiddleware],
  ErrorHandler(createProducts)
)

productsRoutes.put(
  '/:id',
  [authMiddleware, adminMiddleware],
  ErrorHandler(updateProduct)
)

productsRoutes.delete(
  '/:id',
  [authMiddleware, adminMiddleware],
  ErrorHandler(deleteProduct)
)
