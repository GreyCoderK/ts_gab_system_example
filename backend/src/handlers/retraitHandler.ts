import RetraitInterface from "../interfaces/handlers/retraitInterface";
import RequestHandler from "./requesthandler";

export default class RetraitHandler extends RequestHandler {
    private _performer: RetraitInterface;

    constructor(performer: RetraitInterface){
        super();
        this._performer = performer
    }

    public handler(request: any) {
        const {montant} = request;
        return this._performer.retrait(montant);
    }
}