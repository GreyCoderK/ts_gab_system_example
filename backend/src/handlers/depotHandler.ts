import DepotInterface from "../interfaces/handlers/depotInterface";
import RequestHandler from "./requesthandler";

export default class DepotHandler extends RequestHandler {
    private _performer: DepotInterface;

    constructor(performer: DepotInterface){
        super();
        this._performer = performer
    }

    public handler(request: any) {
        const {montant} = request;
        return this._performer.depot(montant);
    }
}