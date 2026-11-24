// RESPONSÁVEL: Pessoa 1 (Home, rotas e configuração)
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import { routes } from './app.routes';

// Idioma do app: faz as pipes currency e number mostrarem números no padrão brasileiro (3,9 e US$ 109,95)
registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideRouter(routes),
    // Necessário para os componentes do Ionic funcionarem no modo standalone.
    // mode: 'md' = o mesmo visual (Material) em qualquer aparelho; sem isso o Ionic muda o estilo no iPhone.
    provideIonicAngular({ mode: 'md' }),
    // Necessário para o HttpClient funcionar nos services (Pessoa 2)
    provideHttpClient(),
  ],
};
