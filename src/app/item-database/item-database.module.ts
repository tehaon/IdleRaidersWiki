import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [
    { path: 'item-database/search', component: SearchComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModule,
    HttpClientModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false } // <-- debugging purposes only
    )
  ],
  declarations: [SearchComponent, SearchFilterPipe]
})
export class ItemDatabaseModule { }
