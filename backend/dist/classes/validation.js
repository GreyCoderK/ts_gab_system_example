"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositiveDepotMontant = exports.PositiveRetraitMontant = exports.PositiveMontant = exports.MaxRetrait = exports.BaseValidation = void 0;
const ulid_1 = require("ulid");
const operation_1 = require("./operation");
class BaseValidation {
    constructor(name, operation) {
        this.id = (0, ulid_1.ulid)();
        this._name = name;
        this._operation = operation;
    }
    get name() {
        return this._name;
    }
    get operation() {
        return this._operation;
    }
}
exports.BaseValidation = BaseValidation;
class MaxRetrait extends BaseValidation {
    constructor(amount) {
        super("MaxRetrait", new operation_1.RetraitOperation());
        this._amount = amount;
    }
    validate(value) {
        return this._amount >= value;
    }
}
exports.MaxRetrait = MaxRetrait;
class PositiveMontant extends BaseValidation {
    validate(value) {
        return value > 0;
    }
}
exports.PositiveMontant = PositiveMontant;
class PositiveRetraitMontant extends PositiveMontant {
    constructor() {
        super("PositiveRetraitMontant", new operation_1.RetraitOperation());
    }
}
exports.PositiveRetraitMontant = PositiveRetraitMontant;
class PositiveDepotMontant extends PositiveMontant {
    constructor() {
        super("PositiveRetraitMontant", new operation_1.DepotOperation());
    }
}
exports.PositiveDepotMontant = PositiveDepotMontant;
//# sourceMappingURL=validation.js.map