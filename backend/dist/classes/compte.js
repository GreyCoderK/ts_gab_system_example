"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ulid_1 = require("ulid");
const historique_1 = __importDefault(require("./historique"));
const historiqueType_1 = require("../enums/historiqueType");
const constante_1 = require("../utils/constante");
const TransactionType_1 = require("../enums/TransactionType");
const transaction_1 = __importDefault(require("./transaction"));
const validation_1 = require("./validation");
const performOperation_1 = __importDefault(require("./performOperation"));
const operation_1 = require("./operation");
class Compte extends performOperation_1.default {
    constructor(options) {
        super();
        this._id = (0, ulid_1.ulid)();
        this._solde = options.solde || 0;
        this.transactionLogger = options.transactionLogger;
        this.validations = [
            new validation_1.PositiveRetraitMontant(),
            new validation_1.PositiveDepotMontant()
        ];
    }
    get solde() {
        return this._solde;
    }
    get id() {
        return this._id;
    }
    setLogger(value) {
        this.transactionLogger = value;
    }
    retrait(montant) {
        var _a, _b;
        this.checkValidations(new operation_1.RetraitOperation(), montant);
        (_a = this.transactionLogger) === null || _a === void 0 ? void 0 : _a.addTransaction(new transaction_1.default(-montant, TransactionType_1.TransactionType.RETRAIT, this));
        this._solde -= montant;
        (_b = this.transactionLogger) === null || _b === void 0 ? void 0 : _b.addHistorique(new historique_1.default(historiqueType_1.HistoriqueType.TRANSACTION, constante_1.WITHDRAW_MESSAGE, -montant));
    }
    depot(montant) {
        var _a, _b;
        this.checkValidations(new operation_1.DepotOperation(), montant);
        (_a = this.transactionLogger) === null || _a === void 0 ? void 0 : _a.addTransaction(new transaction_1.default(montant, TransactionType_1.TransactionType.DEPOT, this));
        this._solde += montant;
        (_b = this.transactionLogger) === null || _b === void 0 ? void 0 : _b.addHistorique(new historique_1.default(historiqueType_1.HistoriqueType.TRANSACTION, constante_1.DEPOSIT_MESSAGE, montant));
    }
    getHistoriques(dateDebut, dateFin) {
        var _a;
        if (!this.transactionLogger) {
            return [];
        }
        (_a = this.transactionLogger) === null || _a === void 0 ? void 0 : _a.addTransaction(new transaction_1.default(0, TransactionType_1.TransactionType.HISTORIQUE, this));
        if (!dateFin) {
            dateFin = new Date();
        }
        const historiques = this.transactionLogger.getHistoriques(dateDebut, dateFin).filter((historique) => {
            var _a;
            return this.id === ((_a = historique === null || historique === void 0 ? void 0 : historique.compte) === null || _a === void 0 ? void 0 : _a.id);
        });
        this.transactionLogger.addHistorique(new historique_1.default(historiqueType_1.HistoriqueType.TRANSACTION, constante_1.HISTORY_MESSAGE, historiques));
        return historiques;
    }
    getCompteSolde() {
        var _a, _b;
        (_a = this.transactionLogger) === null || _a === void 0 ? void 0 : _a.addTransaction(new transaction_1.default(this._solde, TransactionType_1.TransactionType.SOLDE, this));
        (_b = this.transactionLogger) === null || _b === void 0 ? void 0 : _b.addHistorique(new historique_1.default(historiqueType_1.HistoriqueType.TRANSACTION, constante_1.SOLDE_MESSAGE, this._solde));
        return this._solde;
    }
    getValidations() {
        return this.validations;
    }
}
exports.default = Compte;
//# sourceMappingURL=compte.js.map