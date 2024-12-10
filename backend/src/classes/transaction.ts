import { ulid } from "ulid";
import Compte from "./compte";
import { TransactionType } from "../enums/TransactionType";

export default class Transaction{
    private _id: string;
    private _date: Date;
    private _compte: Compte|null;
    private _montant: number;
    private _type: TransactionType;

    constructor(montant: number, type: TransactionType,compte: Compte|null){
        this._id = ulid();
        this._type = type;
        this._compte = compte;
        this._montant = montant;
        this._date = new Date();
    }

    public get id(){
        return this._id;
    }

    public get compte(){
        return this._compte;
    }

    public get montant(){
        return this._montant;
    }

    public get transactionType(){
        return this._type;
    }

    public get date(){
        return this._date;
    }
}