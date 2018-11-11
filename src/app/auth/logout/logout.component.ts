import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/globals.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(private globalsService: GlobalsService, private router: Router) {

    }

    ngOnInit() {
        Promise.resolve(null).then(() => {
            this.globalsService.setDisplayName('');
            this.globalsService.setUserToken('');
        });

        this.router.navigate(['/auth/login']);
    }
}
