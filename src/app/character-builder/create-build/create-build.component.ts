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
    raidertiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    subs = new Subscription();
    items: Item[] = [];
    skills: string[] = [];
    inventory: Item[] = [];

    constructor(private dragulaService: DragulaService, private itemsService: ItemsService) {
        this.subs.add(this.dragulaService.dropModel('items')
            .subscribe(({ sourceModel, targetModel, item }) => {
                if (targetModel.length > 4) {
                    setTimeout(function() {
                        const index = targetModel.indexOf(item, 0);
                        const deletedItem = targetModel.splice(index, 1)[0];
                        sourceModel.push(deletedItem);
                    }, 100);
                }
            })
        );
    }

    ngOnInit() {
        this.inventory = this.itemsService.getEquippedItems();
    }

    ngOnDestroy() {
        // destroy all the subscriptions at once
        this.subs.unsubscribe();
    }

}
