import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeMasteryOfTheElements extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Mastery Of The Elements';
        this.costCalculator = new BasicCostClaculator(1000);
        this.bonusMultiplier = 1;
        this.maxUnlocks = 5;
    }
}
