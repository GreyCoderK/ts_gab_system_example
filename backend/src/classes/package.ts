import { ulid } from "ulid";
import { BaseValidation, MaxRetrait, PositiveDepotMontant, PositiveRetraitMontant } from "./validation";
import { PackageType } from "../enums/packageType";

export abstract class Package{
    private id: string;
    private name: string;
    private type: PackageType;
    private _validations: BaseValidation[];
    
    constructor(name:string, type: PackageType, validations: BaseValidation[]){
        this.id = ulid();
        this.name = name;
        this.type = type;
        this._validations = validations;
    }

    public get validations(){
        return this._validations;
    }
}

export class Start extends Package {
    constructor(){
        super(
            "Start", 
            PackageType.START,
            [
                new PositiveRetraitMontant(),
                new PositiveDepotMontant(),
                new MaxRetrait(300000)
            ]
        )
    }
}

export class Liberty extends Package {
    constructor(){
        super(
            "Liberty", 
            PackageType.LIBERTY,
            [
                new PositiveRetraitMontant(),
                new PositiveDepotMontant(),
                new MaxRetrait(800000)
            ]
        )
    }
}

export class Elite extends Package {
    constructor(){
        super(
            "Elite", 
            PackageType.ELITE,
            [
                new PositiveRetraitMontant(),
                new PositiveDepotMontant(),
                new MaxRetrait(2500000)
            ]
        )
    }
}