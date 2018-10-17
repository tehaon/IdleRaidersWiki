import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeMoreXP extends AncientWisdom {
    constructor() {
        super();

        this.name = 'More XP';
        this.costCalculator = new BasicCostClaculator(300);
        this.bonusMultiplier = 0.5;
    }
}
