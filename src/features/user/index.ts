import { Router } from "express";
import { GetUserInfoHandler, ChangeUserInfoHandler, GetUserAvatarHandler } from "./user.handler";
import { authAuthorizedOnly } from "../../middleware";


const userRoutes : Router = Router();

userRoutes.get("/me", authAuthorizedOnly, GetUserInfoHandler);
userRoutes.get("/avatar", authAuthorizedOnly, GetUserAvatarHandler);

userRoutes.put("/me", authAuthorizedOnly, ChangeUserInfoHandler);



export default userRoutes;