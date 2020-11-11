"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Indexes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', (req, res) => {
            res.send('Hola Mundo');
        });
    }
}
const RouterIndexes = new Indexes();
RouterIndexes.routes();
exports.default = RouterIndexes.router;
