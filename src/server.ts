import express,{Application, json} from 'express';
import morgan from 'morgan';
import helmet from 'helmet'
import indexes from './routes/index'
import databaseModule from './database';
import compression from 'compression';
import cors from 'cors';
import PostRouter from './routes/postRoutes'
import LoginServices from './routes/login.routes'
import { NextFunction } from 'express-serve-static-core';
import {connect} from './sql.connection';
export class server {
  private app: Application;
  db;
  constructor(private port?: number | string) {
    this.app = express();
    this.setting();
    this.middlewares();
    this.router();
    this.db = databaseModule.connect();
  }
  setting() {
    
    this.app.set('port', this.port || process.env.PORT || 3000);
  }
  middlewares() {
    this.app.use(morgan('dev'));
    //JSON & HELMET
    this.app.use(json());
    this.app.use(express.urlencoded({extended:false}))
    this.app.use(helmet())
    //CORS && COMPRESSION
    this.app.use(compression());
    this.app.use(cors())
  }
  router() {
    this.app.use(indexes);
    this.app.use('/api/post', PostRouter);
    this.app.use('/api/login', LoginServices)
  }
  async init() {
      await this.app.listen(this.app.get('port'))
    console.log('Servidor en puerto: ' + this.app.get('port'));

  }
  
}