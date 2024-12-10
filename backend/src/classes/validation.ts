import { ulid } from "ulid";
import { DepotOperation, Operation, RetraitOperation } from "./operation";
import ValidationInterface from "../interfaces/validations/validationInterface";

export abstract class BaseValidation implements ValidationInterface {
    private id: string;
    private _name: string;
    private _operation: Operation;

    constructor(name: string, operation:Operation) {        
        this.id = ulid();
        this._name = name;
        this._operation = operation;
    }

    public abstract validate(request:any): boolean;

    public get name(){
        return this._name;
    }

    public get operation(){
        return this._operation;
    }
}

export class MaxRetrait extends BaseValidation {
    private _amount: number;

    constructor(amount: number){
        super("MaxRetrait", new RetraitOperation())
        this._amount = amount
    }

    public validate(value: any): boolean {
        return this._amount >= value;
    }
}

export abstract class PositiveMontant extends BaseValidation {
    public validate(value: any): boolean {
        return value > 0;
    }
}

export class PositiveRetraitMontant extends PositiveMontant {
    constructor(){
        super("PositiveRetraitMontant", new RetraitOperation())
    }
}

export class PositiveDepotMontant extends PositiveMontant {
    constructor(){
        super("PositiveRetraitMontant", new DepotOperation())
    }
}