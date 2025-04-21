import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';  // Agregado

import { provideAuth0 } from '@auth0/auth0-angular';

const redirectUri = typeof window !== 'undefined' ? window.location.origin : '';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    provideAuth0({
      domain: 'dev-r4kpmvq2z52qn82c.us.auth0.com',
      clientId: 'cQoDJaQauwbeWC8LvfnX0C4oeBcXVt0C',
      authorizationParams: {
        redirect_uri: redirectUri
      }
    }),
    provideHttpClient(),
  ]
};
