import { AncientWisdom } from './ancientWisdom.model';
import { BasicCostClaculator } from '../basicCostCalculator';

export class PermanentUpgradeMonsterAncientArtifacts extends AncientWisdom {
    constructor() {
        super();

        this.name = 'Forbidden Knowledge';
        this.costCalculator = new BasicCostClaculator(100);
        this.bonusMultiplier = 0.05;
        this.maxUnlocks = 1;
    }
}
