import { AuthGuardMock } from '../app/mocks/fnd-test-module/auth.guard.mock';

export const environment = {
  production: false,
  authGuard: AuthGuardMock,
  href: '',
  arquivoConfiguracao: 'appConfigE2E.json',
  e2e: false,
  memoryDelay: 400
};
