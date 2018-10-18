import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: 'gearBrowser/search', component: SearchComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false } // <-- debugging purposes only
    )
  ],
  declarations: [SearchComponent]
})
export class GearBrowserModule { }
