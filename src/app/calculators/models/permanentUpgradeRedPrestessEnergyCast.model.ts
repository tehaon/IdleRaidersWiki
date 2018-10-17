import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeRedPrestessEnergyCast extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Red Priestess Energy Heal';
        this.costCalculator = new BasicCostClaculator(500);
        this.bonusMultiplier = -1;
        this.maxUnlocks = 1;
    }

    formatBonus(val: number): string {
        return '';
    }
}
