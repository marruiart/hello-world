import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthProvider } from './core/services/auth/auth.provider';
import { AuthStrapiService } from './core/services/auth/auth-strapi.service';
import { JwtService } from './core/services/auth/jwt.service';
import { ApiService } from './core/services/api.service';
import { HttpClientWebService } from './core/services/http/http-client-web.service';
import { HttpClientProvider } from './core/services/http/http-client.provider';

export function AuthProviderFactory(
  apiSvc: ApiService,
  jwtSvc: JwtService,
) {
  return new AuthStrapiService(apiSvc, jwtSvc);
}

export function httpProviderFactory(
  httpClient: HttpClient,
  platform: Platform,
) {
  return new HttpClientWebService(httpClient);
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
      provide: AuthProvider,
      deps: [ApiService, JwtService],
      useFactory: AuthProviderFactory
    },
    {
      provide: HttpClientProvider,
      deps: [HttpClient, Platform],
      useFactory: httpProviderFactory
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
