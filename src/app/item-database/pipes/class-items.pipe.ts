import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'classItems'
})
export class ClassItemsPipe implements PipeTransform {

  transform(items: Item[], clss: string): any {
    const filteredItems: Item[] = [];

    items.forEach(i => {
        if (i.classRestriction == null
            || i.classRestriction === ''
            || i.classRestriction.toLowerCase() === clss.toLocaleLowerCase()) {
            filteredItems.push(i);
        }
    });

    return filteredItems;
  }

}
