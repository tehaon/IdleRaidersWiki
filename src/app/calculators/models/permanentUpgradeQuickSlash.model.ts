import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeQuickSlash extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Quick Slash';
        this.costCalculator = new BasicCostClaculator(12500);
        this.bonusMultiplier = 1.5;
        this.maxUnlocks = 6;
    }
}
