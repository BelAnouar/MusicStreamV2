import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./features/auth/components/login/login.component";
import {RegisterComponent} from "./features/auth/components/register/register.component";
import {AuthGuard} from "./core/config/auth.guard";

const routes: Routes = [
  { path: 'library', loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule) },
  { path: 'track-detail/:id', loadChildren: () => import('./features/track-detail/track-detail.module').then(m => m.TrackDetailModule) },

  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) , canActivate: [AuthGuard]},


  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
