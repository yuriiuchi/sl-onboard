import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@portinari/portinari-ui';
import { AuthBaseService, I18nBaseService } from 'totvs-log-base-foundation';
import { AuthGuard, GlobalService } from 'totvs-log-web-foundation';
import { AppConfigService } from './../../app-config.service';
import { AppConfigServiceMock } from './../app-config.service.mock';
import { I18nBaseServiceMock } from './entities/i18n/i18n-base.service.mock';
import { AuthServiceMock } from './services/auth/auth.service.mock';
import { GlobalServiceMock } from './services/global/global.service.mock';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    {
      provide: GlobalService,
      useClass: GlobalServiceMock,
    },
    {
      provide: AuthBaseService,
      useClass: AuthServiceMock,
    },
    {
      provide: I18nBaseService,
      useClass: I18nBaseServiceMock,
    },
    {
      provide: AuthGuard,
      useValue: { canActivate: () => Promise.resolve(true) },
    },
    {
      provide: AppConfigService,
      useClass: AppConfigServiceMock
    }
  ],
  exports: [CommonModule, FormsModule, PoModule],
})
export class FndTestModule { }
