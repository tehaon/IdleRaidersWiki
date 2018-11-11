import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GlobalsService {
    private displayName: string;
    private userToken: string;

    constructor(private cookieService: CookieService, private httpClient: HttpClient) {
        console.log('here');
        this.userToken = cookieService.get('userToken');
        this.displayName = cookieService.get('userName');

        console.log(this.userToken);
        console.log(this.displayName);
    }

    getDisplayName() {
        return this.displayName;
    }

    setDisplayName(name: string) {
        this.cookieService.set('userName', name);
        this.displayName = name;

        console.log(this.cookieService.get('userName'));
    }

    getUserToken() {
        return this.userToken;
    }

    setUserToken(token: string) {
        if (token.length > 0) {
            this.httpClient.post('http://localhost:8000/user/getBasicDetails', { token: token }).subscribe((response2: any) => {
                this.setDisplayName(response2.displayName);
            });
        } else {
            this.setDisplayName(undefined);
        }

        this.cookieService.set('userToken', token);
        this.userToken = token;
        console.log(this.cookieService.get('userToken'));
    }
}
