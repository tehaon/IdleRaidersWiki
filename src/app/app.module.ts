import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DiscordComponent } from './discord/discord.component';
import { LinksComponent } from './links/links.component';

import { CalculatorsModule } from './calculators/calculators.module';
import { ItemDatabaseModule } from './item-database/item-database.module';
import { CharacterBuilderModule } from './character-builder/character-builder.module';

import { CookieService } from 'ngx-cookie-service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'discord', component: DiscordComponent },
    { path: 'links', component: LinksComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        DiscordComponent,
        HomeComponent,
        LinksComponent,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        CalculatorsModule,
        ItemDatabaseModule,
        CharacterBuilderModule,
        MDBBootstrapModule.forRoot(),
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
