import { HttpClient } from '@angular/common/http';
import { CanActivate } from '@angular/router';
import { User } from 'oidc-client';
import { AuthBaseService } from 'totvs-log-base-foundation';
import { AppConfigService } from '../../app-config.service';

/**
 * Implementação de guard com uso do serviço de autenticação mocado
 */
export class AuthGuardMock implements CanActivate {

  constructor(
    private authService: AuthBaseService,
    private http: HttpClient) {

  }

  async canActivate(): Promise<boolean> {
    const baseUrl = 'http://localhost:1080';
    return this.http.get(baseUrl + '/api/userinfo').toPromise().then(async (userinfo: any) => {
      const user = new User(
        {
          id_token: userinfo.id_token,
          session_state: userinfo.session_state,
          access_token: userinfo.access_token,
          refresh_token: userinfo.refresh_token,
          token_type: userinfo.token_type,
          scope: userinfo.scope,
          profile: userinfo.profile,
          expires_at: userinfo.expires_at,
          state: userinfo.state
        }
      );
      /** necessário para acessar variável privada e registrar o usuário */
      // tslint:disable-next-line: no-string-literal
      await this.authService['manager'].storeUser(user);
      this.authService.userLoadedEvent.next(user);
      return Promise.resolve(true);
    }).catch(error => {
      console.log(error);
      return Promise.resolve(false);
    });
  }
}
