import { Router } from 'express';
import { authRoutes } from './auth.route';
import { productsRoutes } from './products.route';

export const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRoutes);
