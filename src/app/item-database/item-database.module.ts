import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { HttpClientModule } from '@angular/common/http';
import { ClassItemsPipe } from './pipes/class-items.pipe';
import { ItemTierPipe } from './pipes/item-tier.pipe';


const appRoutes: Routes = [
    { path: 'item-database/search', component: SearchComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModulesPro,
    HttpClientModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false } // <-- debugging purposes only
    )
  ],
  declarations: [SearchComponent, SearchFilterPipe, ClassItemsPipe, ItemTierPipe],
  exports: [ClassItemsPipe, ItemTierPipe]
})
export class ItemDatabaseModule { }
