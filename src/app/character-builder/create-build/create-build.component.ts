import { Component, OnInit, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/item-database/models/item.model';
import { ItemsService } from 'src/app/item-database/items.service';

@Component({
    selector: 'app-create-build',
    templateUrl: './create-build.component.html',
    styleUrls: ['./create-build.component.scss']
})
export class CreateBuildComponent implements OnInit, OnDestroy {

    raiderClasses = ['Warrior', 'Archer', 'Priest', 'Mage'];
    raidersPerClass = {
        'Warrior': [1, 2, 3],
        'Archer': [1, 2],
        'Priest': [1, 2, 3],
        'Mage': [1, 2]
    };
    raidertiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    subs = new Subscription();
    items = {};
    skills: string[] = [];
    inventory = {};

    constructor(private dragulaService: DragulaService, private itemsService: ItemsService) {
    }

    getRaiderEquipment(raiderClass: string) {
        const allItems = this.itemsService.getEquipmentForClass(raiderClass);
        const itemsBytier = {};

        this.raidertiers.forEach((tier) => {
            if (itemsBytier[tier] === undefined) {
                itemsBytier[tier] = [];
            }

            const items = allItems.filter((item) => {
                return item.tier === tier;
            });

            itemsBytier[tier] = items;
        });

        return itemsBytier;
    }

    ngOnInit() {
        this.inventory['Warrior'] = this.getRaiderEquipment('Warrior');
        this.inventory['Archer'] = this.getRaiderEquipment('Archer');
        this.inventory['Priest'] = this.getRaiderEquipment('Priest');
        this.inventory['Mage'] = this.getRaiderEquipment('Mage');

        this.raiderClasses.forEach((raiderClass, i) => {
            this.items[raiderClass] = [];
            this.raidersPerClass[raiderClass].forEach(c => {
                console.log(c);
                this.items[raiderClass][c] = [];
            });

            this.subs.add(this.dragulaService.dropModel(raiderClass.toLowerCase() + '-items')
                .subscribe(({ sourceModel, targetModel, item }) => {
                    if (targetModel.length > 4) {
                        setTimeout(function () {
                            const index = targetModel.indexOf(item, 0);
                            const deletedItem = targetModel.splice(index, 1)[0];
                            sourceModel.push(deletedItem);
                        }, 100);
                    }
                })
            );
        });


    }

    ngOnDestroy() {
        // destroy all the subscriptions at once
        this.subs.unsubscribe();
    }

}
