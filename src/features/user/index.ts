import { Router } from "express";
import { GetUserInfoHandler, ChangeUserInfoHandler } from "./user.handler";
import { authAuthorizedOnly } from "../../middleware";


const userRoutes : Router = Router();

userRoutes.get("/me", authAuthorizedOnly, GetUserInfoHandler);

userRoutes.put("/me", authAuthorizedOnly, ChangeUserInfoHandler);

export default userRoutes;