import { Component, SimpleChanges, OnChanges } from '@angular/core';
import { GlobalsService } from './globals.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
    title = 'IdleRaidersWiki';

    constructor(public globalsService: GlobalsService) {

    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
    }
}
