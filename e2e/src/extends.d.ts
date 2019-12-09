import { promise } from 'selenium-webdriver';

export interface IHttpResponse {
  status?: number;
  body?: {[key: string]: any} | string;
}

export interface IHttpResponseCode {
  statusCode: number;
  body?: string;
}

export interface IHttpErrorResponse {
  error: {[key: string]: any} | string;
  status?: number;
}

export interface IRequestInterceptor {
  method?: string;
  path: string;
  query?: string | {[key: string]: string|string[]};
  response: string | IHttpResponseCode |
            IHttpResponse & {[key: string]: any} |
            IHttpErrorResponse & {[key: string]: any} ;
}

import Global = NodeJS.Global;
export interface CDTGlobal extends Global {
  /**
   * Adiciona itens numa coleção de memória do aplicação angular.
   * @return {!promise.Promise.<any>} A promise that will be resolved
   *     when execution of browser.executeAsyncScript has completed.
   */
  addCollectionItems(collectionName: string, data: Array<any>): promise.Promise<any>;

  /**
   * Limpa os itens numa coleção de memória do aplicação angular.
   * @return {!promise.Promise.<any>} A promise that will be resolved
   *     when execution of browser.executeAsyncScript has completed.
   */
  clearCollectionItems(collectionName: string): promise.Promise<any>;

  /**
   * Adiciona um interceptador para um requisição HTTP.
   * Devolve para a aplicação o conteúdo enviado como resposta esperada
   * @return {!promise.Promise.<any>} A promise that will be resolved
   *     when execution of browser.executeAsyncScript has completed.
   */
  addResponseInterceptor(interceptor: IRequestInterceptor): promise.Promise<any>;
}






