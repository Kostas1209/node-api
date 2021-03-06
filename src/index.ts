const express = require('express');
import config from '../config';
import apiV2 from './features';
import './db';
import * as bcrypt from 'bcrypt';
import { authAllowAny, logger } from './middleware';
import * as redis from 'redis';
const cors = require("cors");

///  generate salt for crypting pasword 
export const SALT : string = bcrypt.genSaltSync(config.salt_bcrypt);
export const redisClient = redis.createClient(config.redis_port, config.redis_host);

redisClient.on("ready",()=>{
  console.log(`redis conection ready at ${config.redis_host}:${config.redis_port}`);
})
const app = express();

/// middleware for logging requests
app.use(logger)
app.use(authAllowAny);
app.use(cors());
app.use('/api', apiV2 );

app.listen(config.port, err => {
    if (err) {
      return console.log(err);
    }
  
    console.log(`Server is listening on ${config.host}:${config.port}`);
  });


//app.use('/apiV1', apiV1);
