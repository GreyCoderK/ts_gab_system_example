"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Billet {
    constructor(value, count) {
        this._count = count;
        this._value = count;
    }
    get value() {
        return this._value;
    }
    get count() {
        return this._count;
    }
}
exports.default = Billet;
//# sourceMappingURL=billet.js.map