import { AncientWisdom } from './ancientWisdom.model';
import { AdvancedCostCalculator } from '../advancedCostCalculator';

export class PermanentUpgradeArcaneWisdom extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Arcane Wisdom';
        this.costCalculator = new AdvancedCostCalculator();
        this.bonusMultiplier = 50;
        this.maxUnlocks = 5;
    }

    formatBonus(val: number): string {
        return '+' + (this.calculateBonus(val)).toLocaleString();
    }
}
