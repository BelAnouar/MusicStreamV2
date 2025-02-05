import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackDetailComponent } from './track-detail.component';

const routes: Routes = [{ path: '', component: TrackDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackDetailRoutingModule { }
