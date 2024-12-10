"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTransaction = formatTransaction;
const TransactionType_1 = require("../enums/TransactionType");
function formatTransaction(transaction) {
    var _a;
    return {
        date: transaction.date,
        compte: (_a = transaction.compte) === null || _a === void 0 ? void 0 : _a.id,
        montant: transaction.montant,
        type: transactionTypeToString(transaction.transactionType)
    };
}
function transactionTypeToString(type) {
    switch (type) {
        case TransactionType_1.TransactionType.DEPOT:
            return "Depot";
        case TransactionType_1.TransactionType.RETRAIT:
            return "Retrait";
        case TransactionType_1.TransactionType.SOLDE:
            return "Solde";
        case TransactionType_1.TransactionType.HISTORIQUE:
            return "Historique";
        case TransactionType_1.TransactionType.LOGOUT:
            return "logout";
        case TransactionType_1.TransactionType.LOGIN:
        default:
            return "login";
    }
}
//# sourceMappingURL=formatTransaction.js.map