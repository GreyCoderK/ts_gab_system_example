import TransactionLoggerInterface from "./transactionLoggerInterface";

export default interface CompteOptionsInterface {
    solde?:number;
    transactionLogger?: TransactionLoggerInterface;
}