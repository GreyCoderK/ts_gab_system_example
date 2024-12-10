import { ulid } from "ulid";
import { Carte } from "./carte";
import Transaction from "./transaction";
import Historique  from "./historique";
import { HistoriqueType } from "../enums/historiqueType";
import { TransactionType } from "../enums/TransactionType";
import Config from "../config/config";
import { AUTH_FAIL, AUTH_SUCCESS, DEPOSIT_MESSAGE, EXPIRE_MESSAGE, HISTORY_MESSAGE, INSUFISANT_MESSAGE, PROVIDE_CARD, SOLDE_MESSAGE, WITHDRAW_MESSAGE } from "../utils/constante";
import Billet from "../utils/billet";
import { BaseValidation } from "./validation";
import GetValidationsInterface from "../interfaces/validations/getValidationsInterface";
import GABInterface from "../interfaces/handlers/gabInterface";
import ConfigInterface from "../interfaces/config/configInterface";
import PerformOperation from "./performOperation";
import { DepotOperation, RetraitOperation } from "./operation";
import { formatTransaction } from "../utils/formatTransaction";

export default class GAB extends PerformOperation implements GetValidationsInterface, GABInterface {
    private _solde = 0;
    private expired: number=0;
    private session: boolean=false;
    private config: ConfigInterface;
    
    private id: string;
    private proxy: Carte|null;
    private location: string;
    private billets: Billet[];
    
    constructor(location: string, billets: Billet[], config: ConfigInterface){
        super();
        this.id = ulid();
        this.billets = billets;
        this.location = location;
        
        this.proxy = null;
        this.config = config;
        
        if (config instanceof Config) {
            config.setGAB(this);
        }
    }

    private validateSession(){
        return (new Date().getTime()) < this.expired;
    }

    public setProxy(carte: Carte|null){
        this.proxy = carte;
    }

    private hasProxy(){
        if(!this.proxy){
            throw new Error(PROVIDE_CARD);
        }
    }

    public getSolde(){
        if(this._solde == 0){
            let total = 0;
            for (const billet of this.billets) {
                total += parseInt(billet.count)* parseInt(billet.value)
            }
            
            this._solde = total;
        }

        return this._solde;
    }

    public getValidations(): BaseValidation[] {
        if(this.proxy === null) {
            return [];
        }else{
            return this.proxy.getValidations();
        }
    }

    public login(pin: string, carte: string): any {
        for (const _carte of this.config.getCartes()) {
            if(_carte.cardNumber == carte){
                this.setProxy(_carte);
            }
            if(_carte.login(pin, carte)){
                this.session = true;
                this.expired = (new Date()).getTime() + 60000*5;
                _carte.proxy.setLogger(this.config);
                break;
            }
        }

        this.config.addTransaction(
            new Transaction(
                0, 
                TransactionType.LOGIN, 
                this.proxy ? this.proxy!.proxy : null
            )
        );
        
        const message = this.session ? AUTH_SUCCESS : AUTH_FAIL;

        this.config.addHistorique(
            new Historique(
                HistoriqueType.CONNEXION,
                message,
                {pin, carte}
            )
        );

        if(this.session){
            return {message , data:{pin, carte, login: this.expired != 0}};
        }else{
            throw new Error(message);
        }

    }

    public logout(message: string=EXPIRE_MESSAGE){
        if(!this.proxy){
            return;
        }

        this.expired = 0;

        this.config.addTransaction(
            new Transaction(
                0, 
                TransactionType.LOGOUT, 
                this.proxy?.proxy
            )
        );

        this.config.addHistorique(
            new Historique(
                HistoriqueType.CONNEXION,
                message,
                {}
            )
        );
        
        this.setProxy(null)
    }

    public getHistoriques(dateDebut:Date, dateFin:Date|null):any{
        this.hasProxy();

        if(this.validateSession()){
            const historiques = this.proxy!.getHistoriques(dateDebut, dateFin);
            return {message: HISTORY_MESSAGE, data: historiques.map((transaction) => formatTransaction(transaction))};
        }else{
            this.logout();
        }
    }

    public getCompteSolde():any{
        this.hasProxy();

        if(this.validateSession()){
            return {message: SOLDE_MESSAGE, data: this.proxy!.getCompteSolde()};
        }else{
            this.logout();
        }
    }

    public depot(montant: number):any{
        this.hasProxy();

        if(this.validateSession()){
            this.checkValidations(new DepotOperation(), montant);

            this.getSolde()
            this.proxy!.depot(montant);
            this._solde += montant;
            return {message: DEPOSIT_MESSAGE, data: {}};
        }else{
            this.logout();
        }
    }

    public retrait(montant: number):any{
        this.hasProxy();

        if(this.validateSession()){
            this.checkValidations(new RetraitOperation(), montant);

            this.getSolde()

            if(this._solde < montant){
                throw new Error(INSUFISANT_MESSAGE);
            }
            
            this.proxy!.retrait(montant);
            this._solde -= montant;
            return {message: WITHDRAW_MESSAGE, data: {}};
        }else{
            this.logout();
        }
    }
}