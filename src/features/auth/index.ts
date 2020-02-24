import { Router } from "express";
import * as passport from 'passport'; 
import config from "../../../config";
import * as FacebookStrategy from 'passport-facebook'
import { RegistrUserHandler, LoginUserHandler, LogoutUserHandler, RefreshTokenHandler } from "./auth.handler";
import { authAuthorizedOnly } from "../../middleware";

const authRouter : Router  = Router();


authRouter.post('/registration', RegistrUserHandler);
authRouter.post('/login', LoginUserHandler)  // with help email and password
authRouter.post('/facebook', passport.authenticate('facebook',{scope: 'email'} )) // with help facebook
authRouter.post('/logout', authAuthorizedOnly, LogoutUserHandler);
authRouter.post('/refresh', RefreshTokenHandler);

export default authRouter;
