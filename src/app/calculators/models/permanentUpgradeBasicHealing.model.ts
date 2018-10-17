import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeBasicHealing extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Basic Healing Auto Hit Ability';
        this.costCalculator = new BasicCostClaculator(200);
        this.maxUnlocks = 10;
    }

    calculateBonus(val: number): number {
        return 5 - (val - 1) * 0.1;
    }

    formatBonus(val: number): string {
        return (this.calculateBonus(val)).toLocaleString() + ' second(s) cooldown';
    }
}
