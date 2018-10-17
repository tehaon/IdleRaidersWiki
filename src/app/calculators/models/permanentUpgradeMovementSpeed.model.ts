import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeMovementSpeed extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Increased Movement Speed';
        this.costCalculator = new BasicCostClaculator(200);
        this.bonusMultiplier = 0.05;
        this.maxUnlocks = 10;
    }
}
