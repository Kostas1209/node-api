import { Router } from "express";
import Controller from './Pagecontrollers';
import * as express from 'express';

const controller = new Controller();
const page: Router = Router();

page.use(express.json())
page.use(express.urlencoded({ extended: true }));

page.get('/',controller.findThree);

page.get('/:pageId',controller.findThree);

page.post('/',controller.postBook);

export default page;