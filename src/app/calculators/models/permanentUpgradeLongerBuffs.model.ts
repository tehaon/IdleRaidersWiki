import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeLongerBuffs extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Longer Buff Duration';
        this.costCalculator = new BasicCostClaculator(300);
        this.bonusMultiplier = 0.05;
        this.maxUnlocks = 10;
    }
}
