import HandlerInterface from "../interfaces/handlers/handlerInterface";

export default abstract class RequestHandler implements HandlerInterface {
    public abstract handler(request: any): any;
}