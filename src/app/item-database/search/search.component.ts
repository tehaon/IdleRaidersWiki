import { Component, OnInit, HostListener } from '@angular/core';
import { Item } from '../models/item.model';
import { MdbTableService } from 'angular-bootstrap-md';
import { ItemsService } from '../items.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

    constructor(private tableService: MdbTableService, private itemsService: ItemsService) {

     }

    wair: number;
    searchFilter: string;
    previous: Item[];
    tableHeaders: string[] = [
        'Name',
        'Class',
        'Tier',
        'AtkSpd',
        'MaxHp',
        'Dmg',
        'Armor',
        'Crit%',
        'CritDmg',
        'RecHealMod',
        'SelfHealMod',
        'HealDmg',
        'MinEnergy',
        'MaxEnergy',
        'EnergyRegen',
        'EnergyGain',
        'CooldownMod'
    ];
    tableHeaderNames: string[] = [
        'name',
        'classRestriction',
        'tier',
        'attackSpeed',
        'maxHp',
        'damage',
        'defenseModifier',
        'critChance',
        'critBonus',
        'receiveHealingModifier',
        'selfHealModifier',
        'healingModifier',
        'minEnergyPoints',
        'maxEnergyPoints',
        'energyRegenerationModifier',
        'energyGainModifier',
        'cooldownModifier'
    ];
    items: Item[];

    @HostListener('input') oninput() {
        this.searchItems();
    }

    ngOnInit() {
        this.wair = 0;

        this.items = this.itemsService.getEquippedItems();

        this.tableService.setDataSource(this.items);
        this.items = this.tableService.getDataSource();
        this.previous = this.tableService.getDataSource();
    }

    calculateWairModifier(val: number) {
        const calculatedVal = (val * (1 + (this.wair / 10)));
        // tslint:disable-next-line:triple-equals
        if (Math.round(calculatedVal) != parseFloat(calculatedVal.toFixed(2))) {
            return (val * (1 + (this.wair / 10))).toFixed(2);
        }

        return Math.round(calculatedVal);
    }

    searchItems() {
        const prev = this.tableService.getDataSource();

        if (!this.searchFilter) {
            this.tableService.setDataSource(this.previous);
            this.items = this.tableService.getDataSource();
        }

        if (this.searchFilter) {
            this.items = this.tableService.searchLocalDataBy(this.searchFilter.toLowerCase());
            this.tableService.setDataSource(prev);
        }
    }

}
