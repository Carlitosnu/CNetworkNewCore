"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sql_connection_1 = require("../sql.connection");
class PostRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Updatepost = req.body;
            const { id } = req.params;
            const conn = yield sql_connection_1.connect();
            yield conn.query('UPDATE post SET ? WHERE id = ?', [Updatepost, id]);
            res.json({ success: true });
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = req.body;
            const conn = yield sql_connection_1.connect();
            yield conn.query('INSERT INTO post SET ?', [newPost]);
            res.json({ success: true });
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const conn = yield sql_connection_1.connect();
            const query = yield conn.query('SELECT * FROM post WHERE id = ' + id);
            res.json(query[0]);
        });
    }
    getall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield sql_connection_1.connect();
            const query = yield conn.query('SELECT * FROM post');
            res.json(query[0]);
        });
    }
    like(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const conn = yield sql_connection_1.connect();
            const query = yield conn.query('SELECT likes FROM post WHERE id = ?', [id]);
            res.json({ query: query[0] });
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log([id]);
            const conn = yield sql_connection_1.connect();
            yield conn.query('DELETE FROM post WHERE id = ' + id);
            res.json({ success: true });
        });
    }
    publicKeyGenerate() {
    }
    routes() {
        this.router.get('/all', this.getall);
        this.router.put('/like/:id', this.like);
        this.router.post('/create', this.createPost);
        this.router.delete('/delete/:id', this.deletePost);
        this.router.get('/find/:id', this.getPost);
        this.router.put('/update/:id', this.update);
    }
}
const PostRouter = new PostRoutes();
exports.default = PostRouter.router;
