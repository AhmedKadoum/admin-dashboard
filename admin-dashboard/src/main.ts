import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { importProvidersFrom } from '@angular/core';
import { MockDataService } from './services/mock-api/mock-data.service';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
//test
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(MockDataService, {
        delay: 500, // Simulate network delay
        apiBase: 'api/'
      })
    )
  ],

}).catch((err) => console.error(err));
