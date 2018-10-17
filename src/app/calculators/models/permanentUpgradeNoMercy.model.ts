import { AncientWisdom } from './ancientWisdom.model';
import { AdvancedCostCalculator } from '../advancedCostCalculator';

export class PermanentUpgradeNoMercy extends AncientWisdom {
    constructor() {
        super();

        this.name = 'No Mercy';
        this.costCalculator = new AdvancedCostCalculator();
        this.bonusMultiplier = 0.1;
    }
}
