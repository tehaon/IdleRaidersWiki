import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeBonusLoot extends AncientWisdom {
    constructor() {
        super();

        this.name = 'More first-kill loot';
        this.costCalculator = new BasicCostClaculator(500);
        this.bonusMultiplier = 1;
        this.maxUnlocks = 2;
    }

    formatBonus(val: number): string {
        return '+' + (this.calculateBonus(val)).toLocaleString();
    }
}
