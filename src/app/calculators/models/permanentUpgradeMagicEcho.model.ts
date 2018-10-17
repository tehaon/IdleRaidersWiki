import { AncientWisdom } from './ancientWisdom.model';
import { AdvancedCostCalculator } from '../advancedCostCalculator';

export class PermanentUpgradeMagicEcho extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Magic Echo';
        this.costCalculator = new AdvancedCostCalculator();
        this.bonusMultiplier = 0.2;
    }
}
