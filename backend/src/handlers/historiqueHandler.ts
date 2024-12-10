import HistoriqueInterface from "../interfaces/handlers/historiqueInterface";
import RequestHandler from "./requesthandler";

export default class HistoriqueHandler extends RequestHandler {
    private _performer: HistoriqueInterface;

    constructor(performer: HistoriqueInterface){
        super();
        this._performer = performer
    }

    public handler(request: any) {
        const {dateDebut, dateFin} = request;
        return this._performer.getHistoriques(dateDebut, dateFin);
    }
}