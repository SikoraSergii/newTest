import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GomokuRoutingModule } from './gomoku-routing.module';
import { GomokuComponent } from './gomoku.component';

@NgModule({
  imports: [
    CommonModule,
    GomokuRoutingModule
  ],
  declarations: [
    GomokuComponent
  ]
})
export class GomokuModule { }
