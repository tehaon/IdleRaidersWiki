import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeMoreMercenaries extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Additional Mercenary Slot';
        this.costCalculator = new BasicCostClaculator(200);
        this.bonusMultiplier = 1;
        this.maxUnlocks = 1;
    }

    formatBonus(val: number): string {
        return '+' + (this.calculateBonus(val)).toLocaleString();
    }
}
