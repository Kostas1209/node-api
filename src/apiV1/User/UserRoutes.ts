import { Router } from "express";
import * as express from'express';
import Controller from './UserController';

const controller = new Controller();
const user: Router = Router();
user.use(express.json())
user.use(express.urlencoded({ extended: true }));

user.get('/', controller.GetUserInfo);
user.post('/', controller.RegistrUser);

export default user;