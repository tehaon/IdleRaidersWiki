import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppBootstrapModule } from './app-bootstrap-module';
import { DiscordComponent } from './discord/discord.component';
import { HomeComponent } from './home/home.component';
import { CalculatorsModule } from './calculators/calculators.module';
import { AncientWisdomsComponent } from './calculators/ancient-wisdoms/ancient-wisdoms.component';

import { CookieService } from 'ngx-cookie-service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discord', component: DiscordComponent },
  { path: 'calculators/ancient-wisdoms', component: AncientWisdomsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DiscordComponent,
    HomeComponent
  ],
  imports: [
      FormsModule,
    BrowserModule,
    AppBootstrapModule,
    CalculatorsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
