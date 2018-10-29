import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBuildComponent } from './create-build/create-build.component';
import { RouterModule, Routes } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { ItemDatabaseModule } from '../item-database/item-database.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


const appRoutes: Routes = [
    { path: 'character-builder/create-build', component: CreateBuildComponent }
];


@NgModule({
  imports: [
    CommonModule,
    ItemDatabaseModule,
    MDBBootstrapModule,
    DragulaModule.forRoot(),
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false } // <-- debugging purposes only
    )
  ],
  declarations: [CreateBuildComponent]
})
export class CharacterBuilderModule { }
