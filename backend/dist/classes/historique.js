"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ulid_1 = require("ulid");
class Historique {
    constructor(type, message, data) {
        this.id = (0, ulid_1.ulid)();
        this._type = type;
        this._message = message;
        this._data = data;
    }
    get name() {
        return this._type;
    }
    get message() {
        return this._message;
    }
    get data() {
        return this._data;
    }
}
exports.default = Historique;
//# sourceMappingURL=historique.js.map