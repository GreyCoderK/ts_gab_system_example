import { ulid } from "ulid";
import HistoriqueInterface from "../interfaces/handlers/historiqueInterface";
import Historique from "./historique";
import { HistoriqueType } from "../enums/historiqueType";
import { DEPOSIT_MESSAGE, HISTORY_MESSAGE, SOLDE_MESSAGE, WITHDRAW_MESSAGE } from "../utils/constante";
import { TransactionType } from "../enums/TransactionType";
import Transaction from "./transaction";
import SoldeInterface from "../interfaces/handlers/soldeInterface";
import DepotInterface from "../interfaces/handlers/depotInterface";
import { BaseValidation, PositiveDepotMontant, PositiveRetraitMontant } from "./validation";
import CompteOptionsInterface from "../interfaces/handlers/compteOptionsInterface";
import TransactionLoggerInterface from "../interfaces/handlers/transactionLoggerInterface";
import RetraitInterface from "../interfaces/handlers/retraitInterface";
import LoggerInterface from "../interfaces/handlers/loggerInterface";
import PerformOperation from "./performOperation";
import { DepotOperation, RetraitOperation } from "./operation";

export default class Compte extends PerformOperation implements HistoriqueInterface, SoldeInterface, DepotInterface, RetraitInterface, LoggerInterface{
    private _id: string;
    private _solde: number;    
    public validations: BaseValidation[];
    private transactionLogger?: TransactionLoggerInterface|null;

    constructor(
        options: CompteOptionsInterface
    ) {
        super();
        this._id = ulid();
        this._solde = options.solde || 0;
        this.transactionLogger = options.transactionLogger;
        this.validations = [
            new PositiveRetraitMontant(),
            new PositiveDepotMontant()
        ]
    }
    
    public get solde(){
        return this._solde;
    }

    public get id(){
        return this._id;
    }

    public setLogger(value: TransactionLoggerInterface|null){
        this.transactionLogger = value;
    }

    public retrait(montant: number){
        this.checkValidations(new RetraitOperation(), montant);

        this.transactionLogger?.addTransaction(
            new Transaction(
                -montant,
                TransactionType.RETRAIT,
                this
            )
        );

        this._solde -= montant;

        this.transactionLogger?.addHistorique(
            new Historique(
                HistoriqueType.TRANSACTION,
                WITHDRAW_MESSAGE,
                -montant
            )
        );
    }

    public depot(montant:number){
        this.checkValidations(new DepotOperation(), montant);

        this.transactionLogger?.addTransaction(
            new Transaction(
                montant,
                TransactionType.DEPOT,
                this
            )
        );

        this._solde += montant;

        this.transactionLogger?.addHistorique(
            new Historique(
                HistoriqueType.TRANSACTION,
                DEPOSIT_MESSAGE,
                montant
            )
        );
    }

    public getHistoriques(dateDebut:Date, dateFin:Date|null):Transaction[]{        
        if(!this.transactionLogger){
            return [];
        }

        this.transactionLogger?.addTransaction(
            new Transaction(
                0, 
                TransactionType.HISTORIQUE, 
                this 
            )
        );

        if(!dateFin){
            dateFin = new Date();
        }

        const historiques = this.transactionLogger.getHistoriques(dateDebut, dateFin).filter((historique) => {
            return this.id === historique?.compte?.id;
        }); 

        this.transactionLogger.addHistorique(
            new Historique(
                HistoriqueType.TRANSACTION,
                HISTORY_MESSAGE,
                historiques
            )
        );

        return historiques;
    }

    public getCompteSolde(){
        this.transactionLogger?.addTransaction(
            new Transaction(
                this._solde,
                TransactionType.SOLDE,
                this
            )
        );

        this.transactionLogger?.addHistorique(
            new Historique(
                HistoriqueType.TRANSACTION,
                SOLDE_MESSAGE,
                this._solde
            )
        );
        
        return this._solde;
    }

    public getValidations(): BaseValidation[] {
        return this.validations;
    }
}