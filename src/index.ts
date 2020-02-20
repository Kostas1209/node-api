import * as express from 'express';
import config from '../config';
//import apiV1 from './apiV1';
import apiV2 from './features';
import './db';
import * as bcrypt from 'bcrypt';
import { authAllowAny, logger } from './middleware';

///  generate salt for crypting pasword 
export const SALT = bcrypt.genSaltSync(config.salt_bcrypt);

const app = express();

/// middleware for logging requests
app.use(logger)
app.use(authAllowAny);
app.use('/api', apiV2 );

app.listen(config.port, err => {
    if (err) {
      return console.log(err);
    }
  
    console.log(`Server is listening on ${config.host}:${config.port}`);
  });


//app.use('/apiV1', apiV1);
