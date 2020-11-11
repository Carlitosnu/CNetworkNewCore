import { Response, Request, NextFunction, Router, response } from 'express'
import { connect } from '../sql.connection';
import {Post} from '../interfaces/post.interface'
class PostRoutes{
  router: Router;
  constructor() {
    this.router = Router();
    this.routes()
  }
  async update(req: Request, res: Response) {
    const Updatepost:Post = req.body;
    const { id } = req.params;
    const conn = await connect()
    await conn.query('UPDATE post SET ? WHERE id = ?', [Updatepost, id]);
    res.json({success : true})
  }
  async createPost(req:Request,res:Response) {
    const newPost:Post = req.body;
    const conn = await connect()
    await conn.query('INSERT INTO post SET ?', [newPost]);
    res.json({ success: true})
  }
  async getPost(req: Request, res: Response) {
    const { id } = req.params;
    const conn = await connect()
    const query = await conn.query('SELECT * FROM post WHERE id = ' + id);
    res.json(query[0]);
  }
  async getall(req: Request, res: Response) {
    const conn = await connect()
    const query = await conn.query('SELECT * FROM post');
    res.json(query[0])
  }
  async like(req: Request, res: Response) {
    const { id } = req.params;
    const conn = await connect();
    const query = await conn.query('SELECT likes FROM post WHERE id = ?', [id])
    query.length
    res.json({query:query[0]})
  }
  async deletePost(req:Request,res:Response) {
    const { id } = req.params;
    console.log([id]);
    const conn = await connect();
    await conn.query('DELETE FROM post WHERE id = ' + id);
    res.json({ success: true})

  }
  publicKeyGenerate() {
    
  }
  routes() {
    this.router.get('/all', this.getall)
    this.router.put('/like/:id', this.like)
    this.router.post('/create', this.createPost)
    this.router.delete('/delete/:id',this.deletePost)
    this.router.get('/find/:id', this.getPost)
    this.router.put('/update/:id', this.update)
  }
}
const PostRouter = new PostRoutes();

export default PostRouter.router;