import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeEnergy extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Increased Energy Points';
        this.costCalculator = new BasicCostClaculator(400);
        this.bonusMultiplier = 10;
        this.maxUnlocks = 2;
    }

    formatBonus(val: number): string {
        return '+' + (this.calculateBonus(val)).toLocaleString();
    }
}
