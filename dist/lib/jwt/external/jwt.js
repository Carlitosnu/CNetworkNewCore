"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jwt-simple");
var fs = require('fs');
var main = new Object({
    app: String,
    manteiner: String,
    secret: String,
    createToken() {
        if (!this.app || !this.manteiner || !this.secret) {
            throw "Data not provided";
        }
        var payload = {
            info: {
                app: this.app,
                manteiner: this.manteiner,
            }
        };
        var secret = this.secret;
        var token = jwt.encode(payload, secret);
        let name = 'token' + '.json';
        name = name.toString();
        fs.writeFile(name, `{"token":"${token}"}`, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("File wrote as: " + name);
            }
        });
        var result = token;
        return result;
    },
    DecodeData: {
        secret: String,
        token: String
    },
    DecodeToken() {
        if (this.DecodeData.secret && this.DecodeData.token) {
            var decoded = jwt.decode(this.DecodeData.token, this.DecodeData.secret);
            return decoded;
        }
        else {
            return "Please Provide a token or secret";
        }
    },
});
module.exports = main;
