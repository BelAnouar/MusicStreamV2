import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatIconModule} from "@angular/material/icon";
import {CoreModule} from "./core/core.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared/shared.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {appEffects} from './store/effects';
import {environment} from "../environments/environments";
import {APP_CONFIG, APP_SERVICE_CONFIG} from "./core/config/config.service";
import {HttpClient, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {authReducer} from "./store/reducers/auth.reducer";
import {metaReducers, reducers} from "./store/reducers";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./features/auth/auth.module";
import {JwtModule} from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("access_token")
}
@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,AuthModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(    {
        ...reducers,

      },
      { metaReducers } ),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8084"],
        disallowedRoutes: ["http://localhost:8084/api/auth/login"],
      },
    }),
  ],
  providers: [
    {
      provide:APP_SERVICE_CONFIG,
      useValue:APP_CONFIG
    },
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
