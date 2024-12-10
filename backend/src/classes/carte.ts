import { ulid } from "ulid";
import Compte from "./compte";
import { BaseValidation, MaxRetrait, PositiveDepotMontant, PositiveRetraitMontant } from "./validation";
import { CompteType } from "../enums/compteType";
import PerformOperation from "./performOperation";
import LoginInterface from "../interfaces/handlers/loginInterface";
import { Elite, Liberty, Package, Start } from "./package";
import GetValidationsInterface from "../interfaces/validations/getValidationsInterface";
import { DepotOperation, RetraitOperation } from "./operation";
import HistoriqueInterface from "../interfaces/handlers/historiqueInterface";
import { CARD_DISABLE, PROVIDE_COMPTE } from "../utils/constante";
import SoldeInterface from "../interfaces/handlers/soldeInterface";
import Transaction from "./transaction";
import DepotInterface from "../interfaces/handlers/depotInterface";

export abstract class Carte extends PerformOperation implements LoginInterface, HistoriqueInterface, SoldeInterface, DepotInterface {
    private id: string;
    private pin: string
    private _name: string;
    private _active: boolean;
    private type: CompteType;
    
    public proxy: Compte;
    public validations: BaseValidation[];
    
    constructor(
        pin: string, 
        name: string,
        proxy: Compte,
        active: boolean,
        type: CompteType,
        validations: BaseValidation[]= []
    ) {    
        super();    
        this.id = ulid();
        this.pin = pin;
        this._name = name;
        this._active = active;
        this.type = type;

        this.proxy = proxy;
        this.validations = validations;
    }

    public get cardNumber() {
        return this._name;
    }

    public set active(value: boolean) {
        this._active = value;
    }

    public get active() {
        return this._active;
    }

    private validate():void{
        if(!this.proxy){
            throw new Error(PROVIDE_COMPTE);
        }

        if(!this._active){
            throw new Error(CARD_DISABLE);
        }
    }

    public login(pin: string, carte: string): boolean{
        return this.pin == pin && this._name == carte;
    }

    public getHistoriques(dateDebut:Date, dateFin:Date|null):Transaction[]{
        this.validate();
        return this.proxy!.getHistoriques(dateDebut, dateFin);
    }

    public getCompteSolde():number{
        this.validate();
        return this.proxy!.getCompteSolde();
    }

    public depot(montant:number){
        this.validate();
        this.checkValidations(new DepotOperation(), montant);

        this.proxy!.depot(montant);
    }

    public retrait(montant:number){
        this.validate();
        this.checkValidations(new RetraitOperation(), montant);

        this.proxy!.retrait(montant);
    }
}

export class Epargne extends Carte implements GetValidationsInterface {
    constructor(
        pin: string, 
        name: string,
        compte: Compte,
        active: boolean,
        validations: BaseValidation[] = []
    ){
        super(pin, name,compte, active, CompteType.EPARGNE, validations);
    }

    public getValidations(): BaseValidation[] {
        return this.validations;
    }
}

export class CarteEpargne extends Epargne {
    constructor(
        pin:string, 
        carteNumber: string, 
        compte: Compte
    ){
        super(
            pin, 
            carteNumber, 
            compte, 
            true, 
            [
                new PositiveRetraitMontant(),
                new PositiveDepotMontant(),
                new MaxRetrait(150000)
            ]
        );
    }
}

export class Courant extends Carte implements GetValidationsInterface {
    private _package: Package;

    constructor(
        pin: string, 
        name: string,
        compte: Compte,
        active: boolean,
        _package: Package
    ){
        super(pin, name,compte, active, CompteType.COURANT);
        this._package = _package;
        this.validations = _package.validations;
    }

    public getValidations(): BaseValidation[] {
        return this._package.validations;
    }
}

export class CarteCourantStart extends Courant {
    constructor(
        pin:string, 
        carteNumber: string, 
        compte: Compte
    ){
        super(pin, carteNumber, compte, true, new Start());
    }
}

export class CarteCourantLiberty extends Courant {
    constructor(
        pin:string, 
        carteNumber: string, 
        compte: Compte
    ){
        super(pin, carteNumber, compte, true, new Liberty());
    }
}

export class CarteCourantElite extends Courant {
    constructor(
        pin:string, 
        carteNumber: string, 
        compte: Compte
    ){
        super(pin, carteNumber, compte, true, new Elite());
    }
}