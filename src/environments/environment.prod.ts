import { AuthGuard } from 'totvs-log-web-foundation';

export const environment = {
  production: true,
  authGuard: AuthGuard,
  href: '/wms',
  arquivoConfiguracao: 'appConfig.json',
  e2e: false,
  memoryDelay: 0
};
