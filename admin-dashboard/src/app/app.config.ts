import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HttpClient, provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
// import { AuthEffects } from './store/effects/auth.effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideRouterStore} from '@ngrx/router-store';
import { rootReducers } from './store/reducers';
import { MockDataService } from '../services/mock-api/mock-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { metaReducers, rootReducers } from './store/reducers';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
   provideRouterStore(),
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
    provideHttpClient(),
    // provideStore({ auth:authReducer}, { metaReducers }),
    provideStore(rootReducers),
    // provideEffects([AuthEffects]),
      provideStoreDevtools({
      maxAge: 25,
      autoPause: true,
      trace: false,
      logOnly:false,//true in production
    }),
     importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(MockDataService, {
        delay: 500, // Simulate network delay
        apiBase: 'api/',
        passThruUnknownUrl: false // Set to true if you have real APIs too
      })
    ),
    // For in-memory web API
    { provide: 'MockDataService', useClass: MockDataService }
  ]
};
