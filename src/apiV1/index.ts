import { Router} from "express";
import Page from './Page/PageRoutes';
import User from './User/UserRoutes';
import Login from './Login/LoginRoutes';

const router: Router = Router();

router.use('/page', Page);
router.use('/user', User);
router.use('/auth', Login)

export default router;