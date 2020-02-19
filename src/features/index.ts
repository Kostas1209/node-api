import { Router} from "express";
import { userRoutes } from "./printing-editions";
import * as express from'express';

const router: Router = Router();
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.use('/books', userRoutes);
//router.use('/auth', )
//router.use('/admin/printing-edition', adminRoutes);

export default router;