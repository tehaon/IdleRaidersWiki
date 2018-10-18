import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AncientWisdomsComponent } from './ancient-wisdoms/ancient-wisdoms.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: 'calculators/ancient-wisdoms', component: AncientWisdomsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false } // <-- debugging purposes only
    )
  ],
  declarations: [AncientWisdomsComponent]
})
export class CalculatorsModule { }
