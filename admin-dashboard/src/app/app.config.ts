import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
// import { AuthEffects } from './store/effects/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { rootReducers } from './store/reducers';
import { MockDataService } from '../services/mock-api/mock-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AuthEffects } from './store/effects/auth.effects';
import { CategoryEffects } from './store/effects/category.effect';
import { MedicationEffects } from './store/effects/medication.effect';
// import { metaReducers, rootReducers } from './store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideRouterStore(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng'
            },
            darkModeSelector: false || 'none'
        }

      },
    },
  {
    ripple: true
},
{
    zIndex: {
        modal: 1100,    // dialog, sidebar
        overlay: 1000,  // dropdown, overlaypanel
        menu: 1000,     // overlay menus
        tooltip: 1100   // tooltip
    }
}),
    provideHttpClient(withFetch()),
    // provideStore({ auth:authReducer}, { metaReducers }),
    provideStore(rootReducers),
    provideEffects([AuthEffects, CategoryEffects,MedicationEffects]),
    provideStoreDevtools({
      maxAge: 25,
      autoPause: true,
      trace: false,
      logOnly: false, //true in production
    }),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(MockDataService, {
        delay: 500, // Simulate network delay
        apiBase: 'api/',
        passThruUnknownUrl: false, // Set to true if you have real APIs too
      })
    ),
    // For in-memory web API
    { provide: 'MockDataService', useClass: MockDataService },
  ],
};
