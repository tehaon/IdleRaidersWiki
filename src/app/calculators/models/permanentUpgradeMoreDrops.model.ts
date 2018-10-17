import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeMoreDrops extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Increased Drop Chance';
        this.costCalculator = new BasicCostClaculator(500);
        this.bonusMultiplier = 0.5;
        this.maxUnlocks = 10;
    }
}
