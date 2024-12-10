"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PerformOperation {
    filterValidation(operation) {
        return this.getValidations().filter((validation) => {
            return validation.operation.name == operation.name &&
                validation.operation.type == operation.type;
        });
    }
    checkValidations(operation, montant) {
        for (const validation of this.filterValidation(operation)) {
            if (!validation.validate(montant)) {
                throw new Error(`Validatation ${validation.name.toUpperCase()} Fail`);
            }
        }
    }
}
exports.default = PerformOperation;
//# sourceMappingURL=performOperation.js.map