import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // Import this
import { importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { App } from './app/app'; // This is your root component
import { routes } from './app/app.routes'; // Import your routes file

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes), // This provides 'ActivatedRoute' and fixes the error
    importProvidersFrom(FormsModule)
  ]
}).catch(err => console.error(err));