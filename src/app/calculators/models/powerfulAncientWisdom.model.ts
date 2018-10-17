import { AncientWisdom } from './ancientWisdom.model';

export class PowerfulAncientWisdom extends AncientWisdom {
    calculateCost(): number {
        if (this.maxUnlocks > 0 && this.desiredValue > this.maxUnlocks) {
            Promise.resolve(null).then(() => this.desiredValue = this.maxUnlocks);
            return;
        }

        const c = this.currentValue;
        const d = this.desiredValue;
        const currentCost = (229 * c + 63 * c ** 2 + 8 * c ** 3);
        const desiredCost = (229 * d + 63 * d ** 2 + 8 * d ** 3);
        const cost = (desiredCost - currentCost) * 50 / 3;
        return cost > 0 ? cost : 0;
    }
}
