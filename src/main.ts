import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { TokenInterceptor } from './app/auth/token-interceptor.interceptor';
import { LoadingInterceptor } from './app/interceptor/loading.interceptor';

document.documentElement.classList.add('dark');

bootstrapApplication(App, {
  providers: [
    provideHttpClient( withInterceptors([TokenInterceptor, LoadingInterceptor])),
    provideRouter(routes),
   
    ...appConfig.providers
  ]
}).catch(err => console.error(err));