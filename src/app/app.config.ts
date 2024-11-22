import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch} from '@angular/common/http';
import {provideClientHydration} from '@angular/platform-browser';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import {provideAnimations} from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideNativeDateAdapter} from '@angular/material/core';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(JwtModule.forRoot({}),NgxPermissionsModule.forRoot()), provideAnimationsAsync(),
    provideNativeDateAdapter(), provideAnimationsAsync(), provideAnimationsAsync(),
  ]
};
