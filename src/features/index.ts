import { Router} from "express";
import { userRoutes } from "./printing-editions";
import * as express from'express';
import authRoutes from './auth';

const router: Router = Router();
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.use('/books', userRoutes);
router.use('/auth', authRoutes)
//router.use('/admin/printing-edition', adminRoutes);

export default router;