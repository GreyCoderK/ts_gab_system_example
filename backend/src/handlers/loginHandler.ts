import LoginInterface from "../interfaces/handlers/loginInterface";
import RequestHandler from "./requesthandler";

export default class LoginHandler extends RequestHandler {
    private _performer: LoginInterface;

    constructor(performer: LoginInterface){
        super();
        this._performer = performer
    }

    public handler(request: any) {
        const {pin, carte} = request;
        return this._performer.login(pin, carte);
    }
}