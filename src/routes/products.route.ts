import { Router } from 'express';
import { createProduct } from '../controllers/products.controller';
import { ErrorHandler } from '../error-handler';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';

export const productsRoutes: Router = Router();

productsRoutes.post(
  '/',
  [authMiddleware, adminMiddleware],
  ErrorHandler(createProduct)
);
