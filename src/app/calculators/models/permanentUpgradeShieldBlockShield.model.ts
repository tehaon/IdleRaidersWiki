import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeShieldBlockShield extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Guardian Shield';
        this.costCalculator = new BasicCostClaculator(500);
        this.bonusMultiplier = 0.005;
        this.maxUnlocks = 5;
    }
}
