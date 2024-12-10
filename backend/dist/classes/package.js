"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elite = exports.Liberty = exports.Start = exports.Package = void 0;
const ulid_1 = require("ulid");
const validation_1 = require("./validation");
const packageType_1 = require("../enums/packageType");
class Package {
    constructor(name, type, validations) {
        this.id = (0, ulid_1.ulid)();
        this.name = name;
        this.type = type;
        this._validations = validations;
    }
    get validations() {
        return this._validations;
    }
}
exports.Package = Package;
class Start extends Package {
    constructor() {
        super("Start", packageType_1.PackageType.START, [
            new validation_1.PositiveRetraitMontant(),
            new validation_1.PositiveDepotMontant(),
            new validation_1.MaxRetrait(300000)
        ]);
    }
}
exports.Start = Start;
class Liberty extends Package {
    constructor() {
        super("Liberty", packageType_1.PackageType.LIBERTY, [
            new validation_1.PositiveRetraitMontant(),
            new validation_1.PositiveDepotMontant(),
            new validation_1.MaxRetrait(800000)
        ]);
    }
}
exports.Liberty = Liberty;
class Elite extends Package {
    constructor() {
        super("Elite", packageType_1.PackageType.ELITE, [
            new validation_1.PositiveRetraitMontant(),
            new validation_1.PositiveDepotMontant(),
            new validation_1.MaxRetrait(2500000)
        ]);
    }
}
exports.Elite = Elite;
//# sourceMappingURL=package.js.map