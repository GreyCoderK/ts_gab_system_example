"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ulid_1 = require("ulid");
const transaction_1 = __importDefault(require("./transaction"));
const historique_1 = __importDefault(require("./historique"));
const historiqueType_1 = require("../enums/historiqueType");
const TransactionType_1 = require("../enums/TransactionType");
const config_1 = __importDefault(require("../config/config"));
const constante_1 = require("../utils/constante");
const performOperation_1 = __importDefault(require("./performOperation"));
const operation_1 = require("./operation");
const formatTransaction_1 = require("../utils/formatTransaction");
class GAB extends performOperation_1.default {
    constructor(location, billets, config) {
        super();
        this._solde = 0;
        this.expired = 0;
        this.session = false;
        this.id = (0, ulid_1.ulid)();
        this.billets = billets;
        this.location = location;
        this.proxy = null;
        this.config = config;
        if (config instanceof config_1.default) {
            config.setGAB(this);
        }
    }
    validateSession() {
        return (new Date().getTime()) < this.expired;
    }
    setProxy(carte) {
        this.proxy = carte;
    }
    hasProxy() {
        if (!this.proxy) {
            throw new Error(constante_1.PROVIDE_CARD);
        }
    }
    getSolde() {
        if (this._solde == 0) {
            let total = 0;
            for (const billet of this.billets) {
                total += parseInt(billet.count) * parseInt(billet.value);
            }
            this._solde = total;
        }
        return this._solde;
    }
    getValidations() {
        if (this.proxy === null) {
            return [];
        }
        else {
            return this.proxy.getValidations();
        }
    }
    login(pin, carte) {
        for (const _carte of this.config.getCartes()) {
            if (_carte.cardNumber == carte) {
                this.setProxy(_carte);
            }
            if (_carte.login(pin, carte)) {
                this.session = true;
                this.expired = (new Date()).getTime() + 60000 * 5;
                _carte.proxy.setLogger(this.config);
                break;
            }
        }
        this.config.addTransaction(new transaction_1.default(0, TransactionType_1.TransactionType.LOGIN, this.proxy ? this.proxy.proxy : null));
        const message = this.session ? constante_1.AUTH_SUCCESS : constante_1.AUTH_FAIL;
        this.config.addHistorique(new historique_1.default(historiqueType_1.HistoriqueType.CONNEXION, message, { pin, carte }));
        if (this.session) {
            return { message, data: { pin, carte, login: this.expired != 0 } };
        }
        else {
            throw new Error(message);
        }
    }
    logout(message = constante_1.EXPIRE_MESSAGE) {
        var _a;
        if (!this.proxy) {
            return;
        }
        this.expired = 0;
        this.config.addTransaction(new transaction_1.default(0, TransactionType_1.TransactionType.LOGOUT, (_a = this.proxy) === null || _a === void 0 ? void 0 : _a.proxy));
        this.config.addHistorique(new historique_1.default(historiqueType_1.HistoriqueType.CONNEXION, message, {}));
        this.setProxy(null);
    }
    getHistoriques(dateDebut, dateFin) {
        this.hasProxy();
        if (this.validateSession()) {
            const historiques = this.proxy.getHistoriques(dateDebut, dateFin);
            return { message: constante_1.HISTORY_MESSAGE, data: historiques.map((transaction) => (0, formatTransaction_1.formatTransaction)(transaction)) };
        }
        else {
            this.logout();
        }
    }
    getCompteSolde() {
        this.hasProxy();
        if (this.validateSession()) {
            return { message: constante_1.SOLDE_MESSAGE, data: this.proxy.getCompteSolde() };
        }
        else {
            this.logout();
        }
    }
    depot(montant) {
        this.hasProxy();
        if (this.validateSession()) {
            this.checkValidations(new operation_1.DepotOperation(), montant);
            this.getSolde();
            this.proxy.depot(montant);
            this._solde += montant;
            return { message: constante_1.DEPOSIT_MESSAGE, data: {} };
        }
        else {
            this.logout();
        }
    }
    retrait(montant) {
        this.hasProxy();
        if (this.validateSession()) {
            this.checkValidations(new operation_1.RetraitOperation(), montant);
            this.getSolde();
            if (this._solde < montant) {
                throw new Error(constante_1.INSUFISANT_MESSAGE);
            }
            this.proxy.retrait(montant);
            this._solde -= montant;
            return { message: constante_1.WITHDRAW_MESSAGE, data: {} };
        }
        else {
            this.logout();
        }
    }
}
exports.default = GAB;
//# sourceMappingURL=gab.js.map