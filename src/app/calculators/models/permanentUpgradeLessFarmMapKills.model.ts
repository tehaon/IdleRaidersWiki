import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeLessFarmMapKills extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Reduced Farm Map Clear Requirement';
        this.costCalculator = new BasicCostClaculator(500);
        this.bonusMultiplier = 1;
        this.maxUnlocks = 2;
    }

    formatBonus(val: number): string {
        return '+' + (this.calculateBonus(val)).toLocaleString();
    }
}
