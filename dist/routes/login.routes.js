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
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                res.json({ auth: false, message: "No full data provided" });
                return 0;
            }
            const conn = yield sql_connection_1.connect();
            const [rows, fields] = yield conn.query('select password,email from users where email = ?', [email]);
        });
    }
    routes() {
        this.router.post('/', this.login);
    }
}
const Autentication = new AuthRoutes();
exports.default = Autentication.router;
