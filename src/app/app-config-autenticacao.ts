import { environment } from './../environments/environment';
import { IAuthSettings } from 'totvs-log-base-foundation';

export const configuracaoAutenticacao: IAuthSettings = {
  authority: '',
  client_id: '',
  redirect_uri: environment.href + '/auth-callback',
  post_logout_redirect_uri: window.location.origin + environment.href,
  response_type: 'token id_token',
  scope: 'openid profile email authorization_api offline_access',
  loadUserInfo: true,
  silent_redirect_uri: environment.href + '/assets/silent-renew.html',
  automaticSilentRenew: true,
  revokeAccessTokenOnSignout: true,
  monitorSession: true,
  filterProtocolClaims: false,
  initLazy: true
};
