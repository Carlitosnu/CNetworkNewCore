import { Request, Router, Response } from 'express';

class Indexes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes()
  }
  routes() {
    this.router.get('/', (req, res) => {
      res.send('Hola Mundo')
    })
  }
}

const RouterIndexes = new Indexes();
RouterIndexes.routes();

export default RouterIndexes.router;