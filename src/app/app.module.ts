import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/services/auth/auth.service';
import { AuthStrapiService } from './core/services/auth/auth-strapi.service';
import { JwtService } from './core/services/jwt.service';
import { ApiService } from './core/services/api.service';
import { StorageService } from './core/services/storage.service';

export function AuthServiceProvider(
  apiSvc: ApiService,
  jwtSvc: JwtService,
) {
  return new AuthStrapiService(apiSvc, jwtSvc);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: AuthService,
      deps: [ApiService, JwtService],
      useFactory: AuthServiceProvider
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
