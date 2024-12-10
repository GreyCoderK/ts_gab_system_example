import LogoutInterface from "../interfaces/handlers/logoutInterface";
import { EXPIRE_MESSAGE } from "../utils/constante";
import RequestHandler from "./requesthandler";

export default class LogoutHandler extends RequestHandler {
    private _performer: LogoutInterface;

    constructor(performer: LogoutInterface){
        super();
        this._performer = performer
    }

    public handler(request: any) {
        const {message} = request;
        return this._performer.logout(message ?? EXPIRE_MESSAGE);
    }
}