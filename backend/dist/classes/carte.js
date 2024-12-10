"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarteCourantElite = exports.CarteCourantLiberty = exports.CarteCourantStart = exports.Courant = exports.CarteEpargne = exports.Epargne = exports.Carte = void 0;
const ulid_1 = require("ulid");
const validation_1 = require("./validation");
const compteType_1 = require("../enums/compteType");
const performOperation_1 = __importDefault(require("./performOperation"));
const package_1 = require("./package");
const operation_1 = require("./operation");
const constante_1 = require("../utils/constante");
class Carte extends performOperation_1.default {
    constructor(pin, name, proxy, active, type, validations = []) {
        super();
        this.id = (0, ulid_1.ulid)();
        this.pin = pin;
        this._name = name;
        this._active = active;
        this.type = type;
        this.proxy = proxy;
        this.validations = validations;
    }
    get cardNumber() {
        return this._name;
    }
    set active(value) {
        this._active = value;
    }
    get active() {
        return this._active;
    }
    validate() {
        if (!this.proxy) {
            throw new Error(constante_1.PROVIDE_COMPTE);
        }
        if (!this._active) {
            throw new Error(constante_1.CARD_DISABLE);
        }
    }
    login(pin, carte) {
        return this.pin == pin && this._name == carte;
    }
    getHistoriques(dateDebut, dateFin) {
        this.validate();
        return this.proxy.getHistoriques(dateDebut, dateFin);
    }
    getCompteSolde() {
        this.validate();
        return this.proxy.getCompteSolde();
    }
    depot(montant) {
        this.validate();
        this.checkValidations(new operation_1.DepotOperation(), montant);
        this.proxy.depot(montant);
    }
    retrait(montant) {
        this.validate();
        this.checkValidations(new operation_1.RetraitOperation(), montant);
        this.proxy.retrait(montant);
    }
}
exports.Carte = Carte;
class Epargne extends Carte {
    constructor(pin, name, compte, active, validations = []) {
        super(pin, name, compte, active, compteType_1.CompteType.EPARGNE, validations);
    }
    getValidations() {
        return this.validations;
    }
}
exports.Epargne = Epargne;
class CarteEpargne extends Epargne {
    constructor(pin, carteNumber, compte) {
        super(pin, carteNumber, compte, true, [
            new validation_1.PositiveRetraitMontant(),
            new validation_1.PositiveDepotMontant(),
            new validation_1.MaxRetrait(150000)
        ]);
    }
}
exports.CarteEpargne = CarteEpargne;
class Courant extends Carte {
    constructor(pin, name, compte, active, _package) {
        super(pin, name, compte, active, compteType_1.CompteType.COURANT);
        this._package = _package;
        this.validations = _package.validations;
    }
    getValidations() {
        return this._package.validations;
    }
}
exports.Courant = Courant;
class CarteCourantStart extends Courant {
    constructor(pin, carteNumber, compte) {
        super(pin, carteNumber, compte, true, new package_1.Start());
    }
}
exports.CarteCourantStart = CarteCourantStart;
class CarteCourantLiberty extends Courant {
    constructor(pin, carteNumber, compte) {
        super(pin, carteNumber, compte, true, new package_1.Liberty());
    }
}
exports.CarteCourantLiberty = CarteCourantLiberty;
class CarteCourantElite extends Courant {
    constructor(pin, carteNumber, compte) {
        super(pin, carteNumber, compte, true, new package_1.Elite());
    }
}
exports.CarteCourantElite = CarteCourantElite;
//# sourceMappingURL=carte.js.map