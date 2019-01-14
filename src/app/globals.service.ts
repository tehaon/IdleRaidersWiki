import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalsService {
    private displayName: string;
    private userToken: string;

    constructor(private cookieService: CookieService, private httpClient: HttpClient) {
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
            this.httpClient.post( environment.baseApiUrl + '/user/getBasicDetails', { token: token }).subscribe((response2: any) => {
                this.setDisplayName(response2.displayName);
            });
        } else {
            this.setDisplayName(undefined);
        }

        this.cookieService.set('userToken', token);
        this.userToken = token;
        console.log(this.cookieService.get('userToken'));
    }

    getCookieAsInt(cookieName: string, defaultValue: number = 0) {
        const cookie = this.cookieService.get(cookieName);
        return cookie.length > 0 ? parseInt(cookie, 0) : defaultValue;
    }

    getCookieAsBool(cookieName: string, defaultValue: boolean = false) {
        const cookie = this.cookieService.get(cookieName);
        return cookie.length > 0 ? cookie.toLocaleLowerCase() === 'true' : defaultValue;
    }
}
