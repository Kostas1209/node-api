import { Router } from "express";
import * as passport from 'passport'; 
import config from "../../../config";
import * as FacebookStrategy from 'passport-facebook'
import { RegistrUserHandler, LoginUserHandler, LogoutUserHandler } from "./auth.handler";
import { authAuthorizedOnly } from "../../middleware";

const authRouter : Router  = Router();

passport.use( new FacebookStrategy({
    clientID: config.facebook_id,
    clientSecret: config.facebook_secret,
    callbackURL: config.callback_url
}, 
function(accessToken, refreshToken, profile, done){
    process.nextTick(function(){
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        return done(null, profile);
    });
}
));

authRouter.post('/registration', RegistrUserHandler);
authRouter.post('/login', LoginUserHandler)  // with help email and password
authRouter.post('/facebook', passport.authenticate('facebook',{scope: 'email'} )) // with help facebook
authRouter.post('/logout', authAuthorizedOnly, LogoutUserHandler);

export default authRouter;
