import { CostCalculator } from './costCalculator.interface';

export interface BaseAncientWisdom {
    desiredValue: number;
    currentValue: number;
    name: string;
    maxUnlocks: number;
    costCalculator: CostCalculator;
    bonusMultiplier: number;

    calculateCost: any;
    calculateBonus: any;
    formatBonus: any;
}
