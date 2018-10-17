import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeLessHP extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Reduces Boss HP';
        this.costCalculator = new BasicCostClaculator(200);
        this.bonusMultiplier = 0.01;
        this.maxUnlocks = 10;
    }

    formatBonus(val: number): string {
        return '-' + (this.calculateBonus(val) * 100).toLocaleString() + '%';
    }
}
