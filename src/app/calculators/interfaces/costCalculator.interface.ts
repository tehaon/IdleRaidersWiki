export abstract class CostCalculator {
    costModifier: number;

    constructor(costModifier: number) {
        this.costModifier = costModifier;
    }

    calculateCost: any = function() {
        throw new ReferenceError('Not Implemented');
    };
}
