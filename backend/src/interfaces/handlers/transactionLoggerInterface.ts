import Historique from "../../classes/historique";
import Transaction from "../../classes/transaction";
import HistoriqueInterface from "./historiqueInterface";

export default interface TransactionLoggerInterface extends HistoriqueInterface {
    addTransaction(transaction: Transaction): void;
    addHistorique(historique: Historique): void;
}