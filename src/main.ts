import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { MatIconModule } from '@angular/material/icon';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(MatIconModule),
  ],
}).catch((err) => console.error(err));
