import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeMoreEnemies extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Increased Monster Count';
        this.costCalculator = new BasicCostClaculator(100);
        this.bonusMultiplier = 1;
        this.maxUnlocks = 5;
    }

    formatBonus(val: number): string {
        return '+' + (this.calculateBonus(val)).toLocaleString();
    }
}
