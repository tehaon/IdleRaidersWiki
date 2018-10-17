import { CostCalculator } from './interfaces/costCalculator.interface';

export class AdvancedCostCalculator extends CostCalculator {
    /**
     *
     */
    constructor() {
        super(0);
    }

    calculateCost =  function(currentValue: number, desiredValue: number, costMultiplier: number = 0) {
        const c = currentValue;
        const d = desiredValue;
        const currentCost = (229 * c + 63 * c ** 2 + 8 * c ** 3);
        const desiredCost = (229 * d + 63 * d ** 2 + 8 * d ** 3);
        const cost = (desiredCost - currentCost) * 50 / 3;
        return cost > 0 ? cost : 0;
    };
}
