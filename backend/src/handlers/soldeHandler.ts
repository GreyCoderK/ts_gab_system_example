import SoldeInterface from "../interfaces/handlers/soldeInterface";
import RequestHandler from "./requesthandler";

export default class SoldeHandler extends RequestHandler {
    private _performer: SoldeInterface;

    constructor(performer: SoldeInterface){
        super();
        this._performer = performer
    }

    public handler(request: any) {
        return this._performer.getCompteSolde();
    }
}