"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carte_1 = require("../classes/carte");
const compte_1 = __importDefault(require("../classes/compte"));
const billet_1 = __importDefault(require("../utils/billet"));
class ConfigDependenciesProvider {
    createInitialBillets() {
        return [
            new billet_1.default("1000", "700"),
            new billet_1.default("2000", "50000"),
            new billet_1.default("5000", "20000"),
            new billet_1.default("10000", "70000"),
        ];
    }
    createInitialCartes() {
        return [
            new carte_1.CarteCourantElite("9621", "4916171222144954", new compte_1.default({ solde: 6595154 })),
            new carte_1.CarteCourantLiberty("1915", "5392639410132039", new compte_1.default({ solde: 5921937 })),
            new carte_1.CarteEpargne("3792", "4548545450132039", new compte_1.default({ solde: 129922545 })),
            new carte_1.CarteCourantLiberty("7195", "5392639465335755", new compte_1.default({ solde: 352198333 }))
        ];
    }
}
exports.default = ConfigDependenciesProvider;
//# sourceMappingURL=configDependenciesProvider.js.map