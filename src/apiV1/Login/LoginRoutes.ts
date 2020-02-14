import { Router } from "express";
import Controller from './LoginController';
import * as express from 'express';

const controller = new Controller();
const login: Router = Router();

login.use(express.json())
login.use(express.urlencoded({ extended: true }));

login.post('/login', controller.Login);
login.post('/registr', controller.Login);

export default login;