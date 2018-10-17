import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeLongerFarmTimer extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Longer Farm Map Timer';
        this.costCalculator = new BasicCostClaculator(100);
        this.bonusMultiplier = 5;
        this.maxUnlocks = 3;
    }

    formatBonus(val: number): string {
        return '+' + (this.calculateBonus(val)).toLocaleString();
    }
}
