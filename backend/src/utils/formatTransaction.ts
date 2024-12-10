import Transaction from "../classes/transaction";
import { TransactionType } from "../enums/TransactionType";

export function formatTransaction(transaction: Transaction){
    return {
        date: transaction.date,
        compte: transaction.compte?.id,
        montant: transaction.montant,
        type: transactionTypeToString(transaction.transactionType)
    }
}

function transactionTypeToString(type: TransactionType){
    switch (type) {
        case TransactionType.DEPOT:
            return "Depot"
        case TransactionType.RETRAIT:
            return "Retrait"
        case TransactionType.SOLDE:
            return "Solde"
        case TransactionType.HISTORIQUE:
            return "Historique"
        case TransactionType.LOGOUT:
            return "logout"
        case TransactionType.LOGIN:
        default:
            return "login"
    }
} 

