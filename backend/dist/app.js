"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const depotHandler_1 = __importDefault(require("./handlers/depotHandler"));
const historiqueHandler_1 = __importDefault(require("./handlers/historiqueHandler"));
const soldeHandler_1 = __importDefault(require("./handlers/soldeHandler"));
const logoutHandler_1 = __importDefault(require("./handlers/logoutHandler"));
const loginHandler_1 = __importDefault(require("./handlers/loginHandler"));
const retraitHandler_1 = __importDefault(require("./handlers/retraitHandler"));
const systemInitializer_1 = require("./config/systemInitializer");
const constante_1 = require("./utils/constante");
const app = (0, express_1.default)();
const port = 3000;
const { config, gab } = systemInitializer_1.SystemInitializer.initialize();
app.use((0, cors_1.default)());
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), {
    flags: 'a',
});
app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send("Hello world");
});
app.post('/', (req, res) => {
    try {
        const { action } = req.body;
        let result;
        switch (action) {
            case "Depot":
                result = (new depotHandler_1.default(gab)).handler({
                    montant: req.body.montant
                });
                break;
            case "Retrait":
                result = (new retraitHandler_1.default(gab)).handler({
                    montant: req.body.montant
                });
                break;
            case "Historique":
                result = (new historiqueHandler_1.default(gab)).handler({
                    dateDebut: new Date(req.body.dateDebut),
                    dateFin: new Date(req.body.dateFin) || null
                });
                break;
            case "Solde":
                result = (new soldeHandler_1.default(gab)).handler({});
                break;
            case "Logout":
                result = (new logoutHandler_1.default(gab)).handler({ message: "User logout" });
                break;
            case "Login":
            default:
                const { pin, carte } = req.body;
                if (pin == '' || carte == '') {
                    throw new Error(constante_1.AUTH_FAIL);
                }
                result = (new loginHandler_1.default(gab)).handler({ pin, carte });
                break;
        }
        console.log(result);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map