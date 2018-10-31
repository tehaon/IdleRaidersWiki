import { Component, OnInit, OnDestroy } from '@angular/core';
import { DragulaService, Group } from 'ng2-dragula';
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
    groups: Group[] = [];
    items = {};
    skills: string[] = [];
    inventory = {};

    constructor(private dragulaService: DragulaService, private itemsService: ItemsService) {
        this.inventory['Warrior'] = this.getRaiderEquipment('Warrior');
        this.inventory['Archer'] = this.getRaiderEquipment('Archer');
        this.inventory['Priest'] = this.getRaiderEquipment('Priest');
        this.inventory['Mage'] = this.getRaiderEquipment('Mage');
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
        this.raiderClasses.forEach((raiderClass, i) => {
            this.items[raiderClass] = [];
            this.raidersPerClass[raiderClass].forEach(c => {
                this.items[raiderClass][c] = [];
            });

            const group = this.dragulaService.createGroup(raiderClass.toLowerCase() + '-items', {
                copy: (el, source) => {
                    return source.id.includes('inventory');
                },
                copyItem: (itm: Item) => {
                    const item = new Item();
                    Object.assign(item, itm);
                    return item;
                },
                accepts: (el, target, source, sibling) => {
                    return !target.id.includes('inventory');
                },
                removeOnSpill: true
            });

            this.groups.push(group);

            this.subs.add(this.dragulaService.dropModel(raiderClass.toLowerCase() + '-items')
                .subscribe(({ sourceModel, targetModel, item, target, source }) => {
                    if (targetModel.length > 4) {
                        setTimeout(function () {
                            const index = targetModel.indexOf(item, 0);
                            const deletedItem = targetModel.splice(index, 1)[0];

                            if (!source.id.includes('inventory')) {
                                sourceModel.push(deletedItem);
                            }
                        }, 100);
                    }
                })
            );
        });
    }

    ngOnDestroy() {
        this.subs.unsubscribe();

        this.groups.forEach((group) => {
            this.dragulaService.destroy(group.name);
        });
    }
}
