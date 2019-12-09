import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoModule } from '@portinari/portinari-ui';
import { AuthHandlerType, AUTH_SETTINGS, AUTH_TYPE } from 'totvs-log-base-foundation';
import { AuthGuard, AuthModule, FndModule, IntlModule, INTL_CONFIG } from 'totvs-log-web-foundation';
import { environment } from './../environments/environment';
import { configuracaoAutenticacao } from './app-config-autenticacao';
import { AppConfigService } from './app-config.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryDataModule } from './memory/data-service/in-memory-data.module';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    IntlModule,
    AppRoutingModule,
    FndModule.forRoot(),
    AuthModule.forRoot(),
    PoModule,
    InMemoryDataModule.forRoot()
  ],
  providers: [
    {
      provide: INTL_CONFIG,
      useValue: {
        url: './assets/i18n/translate.json',
        supportedLanguages: AppConfigService.idiomasSuportados
      }
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: AuthGuard,
      useClass: environment.authGuard
    },
    {
      provide: AUTH_SETTINGS,
      useValue: configuracaoAutenticacao
    },
    {
      provide: AUTH_TYPE,
      useValue: {
        type: AuthHandlerType.oauth2
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
