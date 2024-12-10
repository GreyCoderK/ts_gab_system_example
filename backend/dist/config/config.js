"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _Config_instance;
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(configDependencies) {
        this._gab = null;
        this._historiques = [];
        this._transactions = [];
        this._configDependencies = configDependencies;
        this._cartes = configDependencies.createInitialCartes();
    }
    static createInstance(configDependencies) {
        if (!__classPrivateFieldGet(_a, _a, "f", _Config_instance)) {
            __classPrivateFieldSet(_a, _a, new _a(configDependencies), "f", _Config_instance);
        }
        return __classPrivateFieldGet(_a, _a, "f", _Config_instance);
    }
    setGAB(gab) {
        this._gab = gab;
    }
    getGAB() {
        return this._gab;
    }
    getCartes() {
        return this._cartes;
    }
    get historiques() {
        return this._historiques;
    }
    get transactions() {
        return this._transactions;
    }
    addTransaction(transaction) {
        this._transactions.push(transaction);
    }
    addHistorique(historique) {
        this._historiques.push(historique);
    }
    getHistoriques(dateDebut, dateFin) {
        return this._transactions.filter((historique) => {
            const historiqueDate = new Date(historique.date);
            return (historiqueDate >= dateDebut &&
                (dateFin === null || historiqueDate <= dateFin));
        });
    }
}
_a = Config;
_Config_instance = { value: void 0 };
exports.default = Config;
//# sourceMappingURL=config.js.map