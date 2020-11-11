import { Response, Request, NextFunction, Router, response } from 'express'
import { connect } from '../sql.connection';
class AuthRoutes{
  router: Router;
  constructor() {
    this.router = Router();
    this.routes()
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ auth: false, message: "No full data provided" })
      return 0;
    }
    const conn = await connect();
    const [rows, fields] = await conn.query('select password,email from users where email = ?', [email]);
    
  }
  routes() {
    this.router.post('/',this.login)
  }
}
const Autentication = new AuthRoutes();

export default Autentication.router;