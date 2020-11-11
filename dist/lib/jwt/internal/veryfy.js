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
const gen = require('./jwt');
const secreto = require('./secrect');
var jwt = Object.create(gen);
function verification(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { cookies } = req;
        if (!cookies.token) {
            res.redirect('/401');
        }
        else {
            jwt.decrypt.token = cookies.token;
            jwt.secret = secreto.secret;
            const decoded = yield jwt.DecodeToken();
            req.userId = decoded.id;
            next();
            return decoded;
        }
    });
}
module.exports = verification;
