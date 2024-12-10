"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ulid_1 = require("ulid");
class Transaction {
    constructor(montant, type, compte) {
        this._id = (0, ulid_1.ulid)();
        this._type = type;
        this._compte = compte;
        this._montant = montant;
        this._date = new Date();
    }
    get id() {
        return this._id;
    }
    get compte() {
        return this._compte;
    }
    get montant() {
        return this._montant;
    }
    get transactionType() {
        return this._type;
    }
    get date() {
        return this._date;
    }
}
exports.default = Transaction;
//# sourceMappingURL=transaction.js.map