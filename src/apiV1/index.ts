import { Router, response } from "express";
import Page from './Page/PageRoutes';
    

const router: Router = Router();

router.use('/page', Page);

export default router;