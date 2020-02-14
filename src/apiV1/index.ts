import { Router} from "express";
import Page from './Page/PageRoutes';
import User from './User/UserRoutes';
    

const router: Router = Router();

router.use('/page', Page);
router.use('/user', User);

export default router;