import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackDetailRoutingModule } from './track-detail-routing.module';
import { TrackDetailComponent } from './track-detail.component';


@NgModule({
  declarations: [
    TrackDetailComponent
  ],
  imports: [
    CommonModule,
    TrackDetailRoutingModule
  ]
})
export class TrackDetailModule { }
