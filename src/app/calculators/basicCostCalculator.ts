import { CostCalculator } from './interfaces/costCalculator.interface';

export class BasicCostClaculator extends CostCalculator {
    calculateCost = function(currentValue: number, desiredValue: number) {
        const currentCost = currentValue * (currentValue + 1);
        const desiredCost = desiredValue * (desiredValue + 1);
        const cost = (desiredCost - currentCost) * this.costModifier / 2;
        return cost > 0 ? cost : 0;
    };
}
