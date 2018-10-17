import { AncientWisdom } from './ancientWisdom.model';
import { AdvancedCostCalculator } from '../advancedCostCalculator';

export class PermanentUpgradeTargetPractice extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Target Practice';
        this.costCalculator = new AdvancedCostCalculator();
        this.bonusMultiplier = 0.05;
    }
}
