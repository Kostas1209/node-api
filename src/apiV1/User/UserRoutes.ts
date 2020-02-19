import { Router } from "express";
import * as express from'express';
import Controller from './UserController';
import { auth } from "../middlewares";

const controller = new Controller();
const user: Router = Router();
user.use(express.json())
user.use(express.urlencoded({ extended: true }));

user.get('/',auth, controller.GetUserInfo);

user.post('/registr', controller.RegistrUser);
user.post('/login', controller.Login);

user.put('/',auth, controller.ChangeUserInfo);

export default user;