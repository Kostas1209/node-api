import { Router } from "express";
import Controller from './Pagecontrollers';
import * as express from 'express';

const jsonParser = express.json();
const controller = new Controller();
const page: Router = Router();

page.get('/',controller.findThree);

page.get('/:pageId',controller.findThree);

page.post('/',jsonParser,controller.postBook);

export default page;