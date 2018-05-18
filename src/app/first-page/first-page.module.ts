import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstPageRoutingModule } from './first-page-routing.module';
import { FirstPageComponent } from './first-page.component';

@NgModule({
  imports: [
    CommonModule,
    FirstPageRoutingModule
  ],
  declarations: [FirstPageComponent]
})
export class FirstPageModule { }
