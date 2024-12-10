import { ulid } from "ulid";
import { HistoriqueType } from "../enums/historiqueType";

export default class Historique {
    private id: string;
    private _data: any;
    private _type: HistoriqueType;
    private _message: string;

    constructor(type: HistoriqueType, message: string, data: any){
        this.id = ulid();
        this._type = type;
        this._message = message;
        this._data = data;
    }

    public get name(){
        return this._type;
    }

    public get message(){
        return this._message;
    }

    public get data(){
        return this._data;
    }
}