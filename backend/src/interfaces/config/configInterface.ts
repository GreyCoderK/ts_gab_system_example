import { Carte } from "../../classes/carte";
import GABInterface from "../handlers/gabInterface";
import HistoriqueInterface from "../handlers/historiqueInterface";
import TransactionLoggerInterface from "../handlers/transactionLoggerInterface";

export default interface ConfigInterface extends HistoriqueInterface, TransactionLoggerInterface {
    getCartes(): Carte[];
    getGAB(): GABInterface|null;
    setGAB(gab: GABInterface|null): void;
}