import { CostCalculator } from '../interfaces/costCalculator.interface';
import { BaseAncientWisdom } from '../interfaces/baseAncientWisdom.interface';
import { CookieService } from 'ngx-cookie-service';

export abstract class AncientWisdom implements BaseAncientWisdom {
    bonusMultiplier: number;
    desiredValue: number;
    currentValue: number;
    name: string;
    maxUnlocks: number;
    costCalculator: CostCalculator;
    cookieService: CookieService;

    constructor() {
        this.currentValue = 0;
        this.desiredValue = 0;
        this.maxUnlocks = -1;
    }

    setCookieService(cookieService: CookieService): any {
        this.cookieService = cookieService;

        const currentValueCookie = this.cookieService.get(this.name + '|' + 'current');
        const desiredValueCookie = this.cookieService.get(this.name + '|' + 'desired');

        if (currentValueCookie.length > 0) {
            this.currentValue = parseInt(currentValueCookie, 0);
        }

        if (desiredValueCookie.length > 0) {
            this.desiredValue = parseInt(desiredValueCookie, 0);
        }
    }

    updateAncientWisdom(varName: string, val) {
        this.cookieService.set(this.name + '|' + varName, val);
    }

    calculateCost(): number {
        if (this.maxUnlocks > 0 && this.currentValue > this.maxUnlocks) {
            Promise.resolve(null).then(() => this.currentValue = this.maxUnlocks);
            return;
        }

        if (this.maxUnlocks > 0 && this.desiredValue > this.maxUnlocks) {
            Promise.resolve(null).then(() => this.desiredValue = this.maxUnlocks);
            return;
        }

        return this.costCalculator.calculateCost(this.currentValue, this.desiredValue);
    }

    calculateBonus(val: number): number {
        return val * this.bonusMultiplier;
    }

    formatBonus(val: number) {
        return '+' + (this.calculateBonus(val) * 100).toLocaleString() + '%';
    }
}
