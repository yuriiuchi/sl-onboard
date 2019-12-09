import { EventEmitter, Injectable } from '@angular/core';
import { User } from 'oidc-client';
import { IAuthSettings } from 'totvs-log-base-foundation';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceMock {

  userLoadedEvent: EventEmitter<User> = new EventEmitter<User>();

  getUser(): Promise<User> {
    return Promise.resolve({} as User);
  }

  logoutFlow(): Promise<void> {
    return Promise.resolve();
  }

  async changeAuthSettings(authSettings: IAuthSettings): Promise<void> {

  }

  setShortNameTenant(tenant: string) {

  }
}
