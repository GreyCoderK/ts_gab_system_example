"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constante_1 = require("../utils/constante");
const requesthandler_1 = __importDefault(require("./requesthandler"));
class LogoutHandler extends requesthandler_1.default {
    constructor(performer) {
        super();
        this._performer = performer;
    }
    handler(request) {
        const { message } = request;
        return this._performer.logout(message !== null && message !== void 0 ? message : constante_1.EXPIRE_MESSAGE);
    }
}
exports.default = LogoutHandler;
//# sourceMappingURL=logoutHandler.js.map