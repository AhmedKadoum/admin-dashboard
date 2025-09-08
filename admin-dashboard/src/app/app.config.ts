import {
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
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
import { AuthEffects } from './store/effects/auth.effects';
import { CategoryEffects } from './store/effects/category.effect';
import { MedicationEffects } from './store/effects/medication.effect';
import { PatientEffects } from './store/effects/patient.effect';
import { ConfirmationService, MessageService } from 'primeng/api';
import { apiInterceptor } from './interceptors/api.interceptor';
// import { metaReducers, rootReducers } from './store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor])),
    provideRouterStore(),
    provideAnimationsAsync(),
    providePrimeNG(
      {
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
      }
    ),
    ConfirmationService,
    MessageService,
    // provideStore({ auth:authReducer}, { metaReducers }),
    provideStore(rootReducers),
    provideEffects([AuthEffects, CategoryEffects,MedicationEffects,PatientEffects]),
    provideStoreDevtools({
      maxAge: 25,
      autoPause: true,
      trace: false,
      logOnly: false, //true in production
    }),
  ],
};
