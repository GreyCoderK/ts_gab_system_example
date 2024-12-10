import { ulid } from "ulid";
import { OperationType } from "../enums/operationType";

export abstract class Operation {
    private id: string;
    private _name: string;
    private _type: OperationType;

    constructor(name: string, type:OperationType) {        
        this.id = ulid();
        this._name = name;
        this._type = type;
    }

    public get name(){
        return this._name;
    }

    public get type(){
        return this._type;
    }
}

export class LoginOperation extends Operation {
    constructor(){
        super("Login", OperationType.LOGIN)
    }
}

export class LogoutOperation extends Operation {
    constructor(){
        super("Logout", OperationType.LOGOUT)
    }
}

export class DepotOperation extends Operation {
    constructor(){
        super("Depôt", OperationType.DEPOT)
    }
}

export class RetraitOperation extends Operation {
    constructor(){
        super("Retrait", OperationType.RETRAIT)
    }
}

export class SoldeOperation extends Operation {
    constructor(){
        super("Solde", OperationType.SOLDE)
    }
}

export class HistoriqueOperation extends Operation {
    constructor(){
        super("Historique", OperationType.HISTORIQUE)
    }
}