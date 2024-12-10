export  default class Billet{
    private _value: string;
    private _count: string;

    constructor(value: string, count: string){
        this._count = count;
        this._value = count;
    }

    get value(){
        return this._value;
    }

    get count(){
        return this._count;
    }
}