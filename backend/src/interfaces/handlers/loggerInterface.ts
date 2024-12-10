import TransactionLoggerInterface from "./transactionLoggerInterface";

export default interface LoggerInterface {
    setLogger(value: TransactionLoggerInterface|null): void;
}