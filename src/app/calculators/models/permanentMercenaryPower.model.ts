import { AncientWisdom } from './ancientWisdom.model';
import { AdvancedCostCalculator } from '../advancedCostCalculator';

export class PermanentMercenaryPower extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Mercenary Power';
        this.costCalculator = new AdvancedCostCalculator();
        this.bonusMultiplier = 0.2;
        this.maxUnlocks = 5;
    }
}
