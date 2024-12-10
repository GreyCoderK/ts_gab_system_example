"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemInitializer = void 0;
const gab_1 = __importDefault(require("../classes/gab"));
const config_1 = __importDefault(require("./config"));
const configDependenciesProvider_1 = __importDefault(require("./configDependenciesProvider"));
class SystemInitializer {
    static initialize() {
        const configDependencies = new configDependenciesProvider_1.default();
        const config = config_1.default.createInstance(configDependencies);
        const gab = new gab_1.default("Cocody", configDependencies.createInitialBillets(), config);
        return { config, gab };
    }
}
exports.SystemInitializer = SystemInitializer;
//# sourceMappingURL=systemInitializer.js.map