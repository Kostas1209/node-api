import * as express from 'express';
import config from '../config';
import apiV1 from './apiV1';
import './db';


const app = express();
app.use((request , response, next)=>{
  console.log(request.url +' ' + request.method + ' ');
  next();
})

app.listen(config.port, err => {
    if (err) {
      return console.log(err);
    }
  
    console.log(`Server is listening on ${config.host}:${config.port}`);
  });

app.use('/apiV1', apiV1)