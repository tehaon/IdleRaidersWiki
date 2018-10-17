import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeMoreGold extends AncientWisdom {
    constructor() {
        super();

        this.name = 'More Gold';
        this.costCalculator = new BasicCostClaculator(500);
        this.bonusMultiplier = 0.05;
    }

    formatBonus(val: number): string {
        const baseGold = 3;
        const bonus = this.calculateBonus(val);
        return '+' + (bonus * 100).toLocaleString() + '% (' + ((1 + bonus) * baseGold).toLocaleString() + '/kill)';
    }
}
