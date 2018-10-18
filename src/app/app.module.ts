import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DiscordComponent } from './discord/discord.component';

import { AppBootstrapModule } from './app-bootstrap-module';
import { CalculatorsModule } from './calculators/calculators.module';
import { GearBrowserModule } from './gearBrowser/gear-browser.module';

import { CookieService } from 'ngx-cookie-service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'discord', component: DiscordComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        DiscordComponent,
        HomeComponent,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppBootstrapModule,
        CalculatorsModule,
        GearBrowserModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
