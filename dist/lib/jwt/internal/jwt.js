"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jwt-simple");
var main = new Object({
    id: String,
    secret: String,
    expires: String,
    decrypt: {
        token: String
    },
    createToken() {
        if (!this.id || !this.secret) {
            console.log("No full data provided");
        }
        else {
            var payload = {
                id: this.id
            };
            var secret = this.secret;
            var token = jwt.encode(payload, secret, {
                expiresIn: this.expires
            });
            var result = token;
            return result;
        }
    },
    DecodeToken() {
        if (this.secret && this.decrypt.token) {
            var decoded = jwt.decode(this.decrypt.token, this.secret);
            return decoded;
        }
        else {
            return "Please Provide a token or secret";
        }
    },
});
module.exports = main;
