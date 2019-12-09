import { Observable, of } from 'rxjs';
import { AppConfigServiceMock } from './../../../app-config.service.mock';
import {
  LoadingDefault,
  BaseMessage,
  II18nBaseService,
  ILiterals,
  II18nBaseLanguage,
  ITextMessage,
  IBaseMessage,
  II18nUpdateOptions,
  ShowMessageOptions,
  IShowMessage
} from 'totvs-log-base-foundation';

const data = require('./../../../../../assets/i18n/translate.json');

export class LoadingMock extends LoadingDefault {

  showLoading() {
  }

  hideLoading() {
  }

  setLoadingText(loadingText: BaseMessage) {
  }
}

export class MessageMock implements IShowMessage {

  displayMessage(showMessageOptions: ShowMessageOptions) {}

  showMessage(message: IBaseMessage, messageOptions?: ShowMessageOptions) {}

}

export class II18nBaseServiceMock implements II18nBaseService {

  private language = 'pt-br';

  literals: ILiterals = data[this.language];

  updateOptions(options: II18nUpdateOptions): Observable<ILiterals> {
    this.literals = data[options.language];
    return of(this.literals);
  }

  text(baseMsg: IBaseMessage): ITextMessage {
    return undefined;
  }

  format(_data: any[], text: string): string {
    return '';
  }

  getLanguage(): string {
    return this.language;
  }

  getSupportedLanguages(): II18nBaseLanguage[] {
    return AppConfigServiceMock.idiomasSuportados;
  }
}

export class GlobalServiceMock {

  i18n = new II18nBaseServiceMock();
  msg = new MessageMock();
  loading = new LoadingMock();

  constructor() {
  }
}
