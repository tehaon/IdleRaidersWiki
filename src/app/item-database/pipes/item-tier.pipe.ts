import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'itemTier'
})
export class ItemTierPipe implements PipeTransform {

  transform(items: Item[], tier: number): Item[] {
    const filteredItems: Item[] = [];

    items.forEach(i => {
        if (i.tier === tier) {
            filteredItems.push(i);
        }
    });

    return filteredItems;
  }

}
