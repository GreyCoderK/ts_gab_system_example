import GetValidationsInterface from "../interfaces/validations/getValidationsInterface";
import { Operation } from "./operation";
import { BaseValidation } from "./validation";

export default abstract class PerformOperation implements GetValidationsInterface{
    public abstract getValidations(): BaseValidation[];

    protected filterValidation(operation: Operation){
        return this.getValidations().filter((validation) => {
            return validation.operation.name == operation.name && 
                validation.operation.type == operation.type;
        });
    }

    public checkValidations(operation:Operation, montant: number){
        for (const validation of this.filterValidation(operation)) {
            if(!validation.validate(montant)){
                throw new Error(`Validatation ${validation.name.toUpperCase()} Fail`);
            }
        }
    }
}