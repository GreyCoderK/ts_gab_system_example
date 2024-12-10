"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requesthandler_1 = __importDefault(require("./requesthandler"));
class HistoriqueHandler extends requesthandler_1.default {
    constructor(performer) {
        super();
        this._performer = performer;
    }
    handler(request) {
        const { dateDebut, dateFin } = request;
        return this._performer.getHistoriques(dateDebut, dateFin);
    }
}
exports.default = HistoriqueHandler;
//# sourceMappingURL=historiqueHandler.js.map