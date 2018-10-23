import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
    name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform {

    transform(items: Item[], filter?: any): any {
        const filteredItems: Item[] = [];

        if (filter === undefined || filter == null || filter === '') {
            return items;
        }

        filter = filter.toLowerCase();

        items.forEach(item => {
            if (item.name.toLowerCase().includes(filter) || item.classRestriction.toLowerCase().includes(filter)) {
                filteredItems.push(item);
            }
        });

        return filteredItems;
    }
}
