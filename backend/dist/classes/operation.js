"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoriqueOperation = exports.SoldeOperation = exports.RetraitOperation = exports.DepotOperation = exports.LogoutOperation = exports.LoginOperation = exports.Operation = void 0;
const ulid_1 = require("ulid");
const operationType_1 = require("../enums/operationType");
class Operation {
    constructor(name, type) {
        this.id = (0, ulid_1.ulid)();
        this._name = name;
        this._type = type;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
}
exports.Operation = Operation;
class LoginOperation extends Operation {
    constructor() {
        super("Login", operationType_1.OperationType.LOGIN);
    }
}
exports.LoginOperation = LoginOperation;
class LogoutOperation extends Operation {
    constructor() {
        super("Logout", operationType_1.OperationType.LOGOUT);
    }
}
exports.LogoutOperation = LogoutOperation;
class DepotOperation extends Operation {
    constructor() {
        super("Depôt", operationType_1.OperationType.DEPOT);
    }
}
exports.DepotOperation = DepotOperation;
class RetraitOperation extends Operation {
    constructor() {
        super("Retrait", operationType_1.OperationType.RETRAIT);
    }
}
exports.RetraitOperation = RetraitOperation;
class SoldeOperation extends Operation {
    constructor() {
        super("Solde", operationType_1.OperationType.SOLDE);
    }
}
exports.SoldeOperation = SoldeOperation;
class HistoriqueOperation extends Operation {
    constructor() {
        super("Historique", operationType_1.OperationType.HISTORIQUE);
    }
}
exports.HistoriqueOperation = HistoriqueOperation;
//# sourceMappingURL=operation.js.map