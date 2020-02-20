import { Router} from "express";
import bookRoutes from "./printing-editions";
import * as express from'express';
import authRoutes from './auth';
import userRoutes from './user';

const router: Router = Router();
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.use('/books', bookRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
//router.use('/admin/printing-edition', adminRoutes);

export default router;