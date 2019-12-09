import { HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import {
  getStatusText,
  InMemoryBackendConfigArgs,
  InMemoryDbService,
  ParsedRequestUrl,
  RequestInfo,
  RequestInfoUtilities,
  STATUS,
  UriInfo,
  removeTrailingSlash
} from 'angular-in-memory-web-api';
import { delayResponse } from 'angular-in-memory-web-api/delay-response';
import { stringify } from 'json5';
import { Observable, of } from 'rxjs';
import { v4 } from 'uuid';
import { environment } from './../../../environments/environment';

export const defaultOptions: InMemoryBackendConfigArgs = {
  delay: environment.memoryDelay,
  host: 'http://localhost:1080',
  apiBase: 'api/v1',
  passThruUnknownUrl: true,
  post204: false,
  put204: false
};

export type LoadFn = (dbService: InMemoryDataService) => void;

export type TransformFn = (value: any, dbService: InMemoryDataService) => any;

export type TransformPutFn = (item: any, body: any) => any;

export type FilterFn = (value: any, item: any) => boolean;

export type ErrorResponseFn = (url: string, status: number, message: string, detailedMessage?: string) => HttpErrorResponse;

export type ResponseFn = (url: string, status: number, body?: any) => HttpResponse<any>;

export interface IResponseUtils {
  responseFn: ResponseFn;
  errorResponseFn: ErrorResponseFn;
}

export type ResponseInterceptorFn = (url: string, utils: IResponseUtils, body?: any) => HttpResponse<any> | HttpErrorResponse;

export interface IRequestInterceptor {
  method?: string;
  path: string;
  query?: HttpParams | string;
  response: ResponseInterceptorFn | HttpResponse<any> | HttpErrorResponse;
}

interface QueryFilter {
  name: string;
  rx?: RegExp;
  fn?: FilterFn;
}

interface QueryParams {
  count: number;
  page?: number;
  pageSize?: number;
  conditions?: Array<QueryFilter>;
  useFilterOr?: boolean;
}

interface QueryResult {
  hasNext: boolean;
  items: Array<any>;
}

export function downloadObjectAsJson(exportObj, exportName) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(stringify(exportObj, { space: 2 }));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href',     dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export class InMemoryDataService implements InMemoryDbService {

  private loadsFn: Array<LoadFn> = [];
  private requestInterceptors: Array<IRequestInterceptor> = [];
  private replaceMap: Map<string, string> = new Map();
  private searchTermMap: Map<string, string[]> = new Map();
  private transformGetAllMap: Map<string, TransformFn> = new Map();
  private transformGetByIdMap: Map<string, TransformFn> = new Map();
  private transformPostMap: Map<string, TransformFn> = new Map();
  private transformPutMap: Map<string, TransformPutFn> = new Map();
  private fieldsFilterMap: Map<string, Map<string, FilterFn>> = new Map();
  private db: IDBDatabase;
  private dbe2e: Map<string, Array<any>> = new Map();
  private responseUtils: IResponseUtils = this.getResponseUtils();

  constructor() {
    window['inMemoryDataService'] = this;
  }

  createDb() {
    return of({});
  }

  deleteDatabase(): Promise<boolean> {
    const result$ = new Promise<boolean>((resolve, reject) => {
      // Para testes e2e usa o banco de dados em memória mesmo
      if (environment.e2e) {
        console.log('Deleted e2e OK!');
        resolve(true);
      } else {
        const request = indexedDB.deleteDatabase('wms-memory-db');

        const errorResponse = (event: Event) => {
          console.log('Error deleting the DB');
          const mensagem = 'Não foi possível excluir o banco de dados da memória.\n' +
                          'Verifique se você está com outra aba aberta com a aplicação.\n' +
                          'Este comportamento é necessário para ter a garantia de sempre recriar o banco de dados.';
          alert(mensagem);
          reject((event.target as any).errorCode);
        };

        request.onblocked = (event: Event) => {
          errorResponse(event);
        };

        request.onerror = (event: Event) => {
          errorResponse(event);
        };

        request.onsuccess = () => {
          console.log('Deleted OK.');
          // alert('*** NOTE : Requires page refresh to see the DB removed from the Resources IndexedDB tab in Chrome.');
          resolve(true);
        };
      }
    });
    return result$;
  }

  createDatabase(): Promise<boolean> {
    const self = this;
    const result$ = new Promise<boolean>((resolve, reject) => {
      // Para testes e2e usa o banco de dados em memória mesmo
      if (environment.e2e) {
        console.log('Database e2e created!');
        resolve(true);
      } else {
        const request = window.indexedDB.open('wms-memory-db', 1);

        request.onsuccess = (event: Event) => {
          self.db = request.result;
          console.log('Database created!');
        };

        request.onerror = (event: Event) => {
          console.log('Database error: ', (event.target as any).errorCode);
          reject((event.target as any).errorCode);
        };

        request.onupgradeneeded = (event: Event) => {
          self.db = request.result;
          console.log('Database upgrade nedded!');
          resolve(true);
        };
      }
    });
    return result$;
  }

  createObjectStore(dataServiceFn: Map<string, LoadFn>): Promise<boolean> {
    const self = this;
    const result$ = new Promise<boolean>((resolve, reject) => {
      // Para testes e2e usa o banco de dados em memória mesmo
      if (environment.e2e) {
        dataServiceFn.forEach((loadFn, name) => {
          this.dbe2e.set(name, []);
          if (loadFn && loadFn instanceof Function) {
            loadFn.call(null, self);
          }
        });
        resolve(true);
      } else {
        let objectStore: IDBObjectStore;

        dataServiceFn.forEach((loadFn, name) => {
          objectStore = this.db.createObjectStore(name, { keyPath: 'id' });
          if (loadFn && loadFn instanceof Function) {
            self.loadsFn.push(loadFn);
          }
        });

        objectStore.transaction.oncomplete = (event: Event) => {
          self.loadsFn.forEach(fn => {
            fn.call(null, self);
          });
          resolve(true);
        };
        objectStore.transaction.onerror = (event: Event) => {
          reject(event);
        };
      }
    });
    return result$;
  }

  storeData(collectionName: string, data: any): Promise<string> {
    const self = this;
    const result$ = new Promise<string>((resolve, reject) => {

      if (!data.id) {
        data['id'] = v4();
      }

      // Para testes e2e usa o banco de dados em memória mesmo
      if (environment.e2e) {
        const objectStore = self.dbe2e.get(collectionName);
        objectStore.push(data);
        resolve(data['id']);
      } else {
        const objectStore = self.db.transaction(collectionName, 'readwrite').objectStore(collectionName);
        const request = objectStore.add(data);
        request.onsuccess = (event: Event) => {
          resolve((request.result !== undefined) ? data['id'] : null);
        };
        request.onerror = (event: Event) => {
          reject(event);
        };
      }
    });
    return result$;
  }

  clearData(collectionName: string): Promise<boolean> {
    const self = this;
    const result$ = new Promise<boolean>((resolve, reject) => {
      // Para testes e2e usa o banco de dados em memória mesmo
      if (environment.e2e) {
        self.dbe2e.set(collectionName, []);
        resolve(true);
      } else {
        const objectStore = self.db.transaction(collectionName, 'readwrite').objectStore(collectionName);
        const request = objectStore.clear();
        request.onsuccess = (event: Event) => {
          resolve(true);
        };
        request.onerror = (event: Event) => {
          reject(event);
        };
      }
    });
    return result$;
  }

  addRequestInterceptor(requestInterceptor: IRequestInterceptor) {
    if (!requestInterceptor.method) {
      requestInterceptor['method'] = 'GET';
    }
    this.requestInterceptors.push(requestInterceptor);
  }

  addReplaceUrl(key: string, value: string) {
    this.replaceMap.set(key, value);
  }

  addSearchTermMap(collectionName: string, fields: string[]) {
    this.searchTermMap.set(collectionName, fields);
  }

  addTransformGetAllMap(collectionName: string, transformfn: TransformFn) {
    this.transformGetAllMap.set(collectionName, transformfn);
  }

  addTransformGetByIdMap(collectionName: string, transformfn: TransformFn) {
    this.transformGetByIdMap.set(collectionName, transformfn);
  }

  addTransformPostMap(collectionName: string, transformfn: TransformFn) {
    this.transformPostMap.set(collectionName, transformfn);
  }

  addTransformPutMap(collectionName: string, transformfn: TransformPutFn) {
    this.transformPutMap.set(collectionName, transformfn);
  }

  addFieldFilterMap(collectionName: string, field: string, filterfn: FilterFn) {
    let fieldsFilterMap = this.fieldsFilterMap.get(collectionName);
    if (fieldsFilterMap !== undefined) {
      fieldsFilterMap.set(field, filterfn);
    } else {
      fieldsFilterMap = new Map();
      fieldsFilterMap.set(field, filterfn);
      this.fieldsFilterMap.set(collectionName, fieldsFilterMap);
    }
  }

  addRequestInterceptorByValue(value: any): void {
    let obj: any;
    let response: HttpResponse<any> | HttpErrorResponse;
    if (typeof value === 'string') {
      try {
        obj = JSON.parse(value);
      } catch (error) {
        console.error('O valor informado não é possível de ser interpretado como uma interface IRequestInterceptor');
        return;
      }
    } else {
      obj = value;
    }
    if (obj && obj.path && typeof obj.path === 'string' && obj.response) {
      const path = '/' + obj.path.replace(/^\//, '');
      const url = window.location.origin + path;
      const status = (obj.response.status && typeof obj.response.status === 'number') ? obj.response.status :
                     (obj.response.statusCode && typeof obj.response.statusCode === 'number') ? obj.response.statusCode :
                     (obj.response.error) ? 400 : 200;
      if (typeof obj.response === 'string') {
        response = new HttpResponse({
          body: obj.response,
          url,
          headers: new HttpHeaders({ 'Content-Type': 'text/html; charset=utf-8' }),
          status,
          statusText: getStatusText(status)
        });
      } else if (obj.response.error) {
        response = new HttpErrorResponse({
          error: obj.response.error,
          url,
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          status,
          statusText: getStatusText(status)
        });
      } else {
        response = new HttpResponse({
          body: (obj.response.body) ? obj.response.body : obj.response,
          url,
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          status,
          statusText: getStatusText(status)
        });
      }
    } else {
      console.error('O valor informado não é possível de ser interpretado como uma interface IRequestInterceptor');
      return;
    }

    const requestInterceptor: IRequestInterceptor = {
      method: obj.method ? obj.method : 'GET',
      path: obj.path,
      response,
    };

    let params: HttpParams;
    const query = obj.query ? obj.query :
                 (obj.queryStringParameters ? obj.queryStringParameters : undefined);
    if (query) {
      if (typeof query === 'string') {
        params = new HttpParams({ fromString: query });
      } else {
        params = new HttpParams({ fromObject: query });
      }
      if (params && params.keys.length > 0) {
        requestInterceptor['query'] = params;
      }
    }

    this.requestInterceptors.push(requestInterceptor);
  }

  private getFieldFilterMap(collectionName: string, field: string): FilterFn | undefined {
    const fieldsFilterMap = this.fieldsFilterMap.get(collectionName);
    if (fieldsFilterMap !== undefined) {
      return fieldsFilterMap.get(field);
    } else {
      return undefined;
    }
  }

  private clone(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  private createErrorResponseOptions(url: string, status: number, message: string, detailedMessage?: string): HttpErrorResponse {
    return new HttpErrorResponse({
      error: { message, detailedMessage },
      url,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      status,
      statusText: getStatusText(status)
    });
  }

  private createResponseOptions(url: string, status: number, body?: any): HttpResponse<any> {
    return new HttpResponse({
      body,
      url,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      status,
      statusText: getStatusText(status)
    });
  }

  private filterItem(item: any, conditions: Array<QueryFilter>, useFilterOr: boolean): boolean {
    if (conditions === undefined) {
      return true;
    }
    return useFilterOr ? this.filterItemOr(item, conditions) : this.filterItemAnd(item, conditions);
  }

  private filterItemAnd(item: any, conditions: Array<QueryFilter>): boolean {
    let ok = true;
    let i = conditions.length;
    let cond: QueryFilter;
    while (ok && i) {
      i -= 1;
      cond = conditions[i];
      if (cond.fn) {
        ok = cond.fn.call(this, item);
      } else {
        ok = cond.rx.test(item[cond.name]);
      }
    }
    return ok;
  }

  private filterItemOr(item: any, conditions: Array<QueryFilter>): boolean {
    let ok = false;
    let okUnidade = true;
    let i = conditions.length;
    let cond: QueryFilter;
    while (okUnidade && !ok && i) {
      i -= 1;
      cond = conditions[i];
      if (cond.name === 'unidadeId') {
        okUnidade = cond.fn.call(this, item);
      } else {
        if (cond.fn) {
          ok = cond.fn.call(this, item);
        } else {
          ok = cond.rx.test(item[cond.name]);
        }
      }
    }
    return ok && okUnidade;
  }

  private createFilterFn(value: any, filterFn: FilterFn): FilterFn {
    return (item: any) => {
      return filterFn.call(this, value, item);
    };
  }

  private createFilterUnidadeFn(id: string): FilterFn {
    return (item: any) => {
      return item['unidadeId'] === id;
    };
  }

  private createFilterArrayFn(field: string, value: Array<any>): FilterFn {
    return (item: any) => {
      return value.includes(item[field]);
    };
  }

  private addDelay(response$: Observable<{}>, delay: number) {
    return delay === 0 ? response$ : delayResponse(response$, (Math.floor((Math.random() * delay) + 1)) || 500);
  }

  private getQueryParams(collectionName: string, query: Map<string, string[]>, caseSensitive: string): QueryParams {
    const queryParams: QueryParams = { count: 0 };
    query.forEach((value: Array<any>, name: string) => {
      if (name === 'page') {
        queryParams['page'] = parseInt(value[0], 10);
      } else if (name === 'pageSize') {
        queryParams['pageSize'] = parseInt(value[0], 10);
      } else if (name === 'unidadeId') {
        const condition: QueryFilter = { name };
        if (queryParams['conditions'] === undefined) {
          queryParams['conditions'] = [];
        }
        condition['fn'] = this.createFilterUnidadeFn(value[0]);
        queryParams.conditions.push(condition);
      } else if (name === 'searchTerm' && value[0]) {
        queryParams['useFilterOr'] = true;
        const fields = this.searchTermMap.get(collectionName);
        if (fields !== undefined) {
          if (queryParams['conditions'] === undefined) {
            queryParams['conditions'] = [];
          }
          queryParams.conditions.push(...fields.map<QueryFilter>((field) => {
            return { name: field, rx: new RegExp(decodeURI(value[0]), caseSensitive) };
          }));
        }
      } else if (name !== 'order' && name !== 'fields' && name !== '$filter') {
        if (queryParams['conditions'] === undefined) {
          queryParams['conditions'] = [];
        }
        const condition: QueryFilter = { name };
        const filterFn = this.getFieldFilterMap(collectionName, name);
        if (filterFn !== undefined && filterFn instanceof Function) {
          condition['fn'] = this.createFilterFn( value.length > 1 ? value : decodeURI(value[0]), filterFn);
        } else if (value.length > 1) {
          condition['fn'] = this.createFilterArrayFn(name, value);
        } else {
          condition['rx'] = new RegExp(decodeURI(value[0]), caseSensitive);
        }
        queryParams.conditions.push(condition);
      }
    });
    return queryParams;
  }

  private getAllItems(cursor: any, queryResults: QueryResult, queryParams: QueryParams, transformfn: TransformFn): boolean {
    let retorna = false;
    if (cursor) {
      let item = cursor.value;
      if (this.filterItem(item, queryParams.conditions, queryParams.useFilterOr)) {
        if (queryParams.page && queryParams.pageSize) {
          if (queryParams.count < ((queryParams.page - 1) * queryParams.pageSize)) {
            queryParams.count++;
            cursor.continue();
          } else if (queryParams.count < (queryParams.page * queryParams.pageSize)) {

            if (transformfn !== undefined) {
              item = transformfn.call(this, item, this);
            }

            queryResults.items.push(item);
            queryResults.hasNext = true;
            queryParams.count++;
            cursor.continue();
          } else {
            retorna = true;
          }
        } else {

          if (transformfn !== undefined) {
            item = transformfn.call(this, item, this);
          }

          queryResults.items.push(item);
          queryResults.hasNext = true;
          cursor.continue();
        }
      } else {
        cursor.continue();
      }
    } else {
      queryResults.hasNext = false;
      retorna = true;
    }
    return retorna;
  }

  private findById<T extends { id: any }>(collection: T[], id: any): T {
    return collection.find((item: T) => item.id === id);
  }

  private indexOf(collection: any[], id: any) {
    return collection.findIndex((item: any) => item.id === id);
  }

  getInstance$(collectionName: string, id: string) {
    return new Observable((observer) => {
      const self = this;
      // Para testes e2e usa o banco de dados em memória mesmo
      if (environment.e2e) {
        const objectStore = this.dbe2e.get(collectionName);
        if (id !== undefined && id !== '') {
          observer.next(this.findById(objectStore, id));
          observer.complete();
        } else {
          observer.error('Não foi passado o id');
        }
      } else {
        let request: IDBRequest<any>;
        const objectStore = self.db.transaction(collectionName, 'readwrite').objectStore(collectionName);
        if (id !== undefined && id !== '') {
          request = objectStore.get(id);
          request.onsuccess = (event) => {
            observer.next(request.result);
            observer.complete();
          };
          request.onerror = (event) => {
            observer.error((event.target as any).error);
          };
        } else {
          observer.error('Não foi passado o id');
        }
      }
    });
  }

  get$(collectionName: string, id: string, query: Map<string, string[]>, url: string, caseSensitiveSearch?: string): Observable<any> {
    return new Observable((observer) => {
      const self = this;
      let response: any;
      let request: IDBRequest<any>;
      let isCursor = false;
      let queryParams: QueryParams = { count: 0 };
      const queryResults: QueryResult = { hasNext: false, items: [] };
      // Para testes e2e usa o banco de dados em memória mesmo
      if (environment.e2e) {
        const objectStore = this.dbe2e.get(collectionName);
        if (id !== undefined && id !== '') {
          const transformfn = self.transformGetByIdMap.get(collectionName);
          let item = this.findById(objectStore, id);

          if (item && transformfn !== undefined) {
            item = transformfn.call(this, item, this);
          }

          response = self.createResponseOptions(url, item ? STATUS.OK : STATUS.NOT_FOUND, item);
          observer.next(response);
          observer.complete();
        } else {
          const transformfn = self.transformGetAllMap.get(collectionName);
          if (query) {
            queryParams = self.getQueryParams(collectionName,
              query, (caseSensitiveSearch ? caseSensitiveSearch : 'i'));
          }
          const cursor = {
            index: 0,
            value: null,
            continue: (): any => {}
          };
          while (cursor.index <= objectStore.length) {
            cursor.value = (cursor.index < objectStore.length) ? objectStore[cursor.index++] : null;
            if (self.getAllItems((cursor.value ? cursor : null), queryResults, queryParams, transformfn)) {
              response = self.createResponseOptions(url, STATUS.OK, queryResults);
              observer.next(response);
              observer.complete();
              break;
            }
          }
        }
      } else {
        const objectStore = self.db.transaction(collectionName, 'readwrite').objectStore(collectionName);
        if (id !== undefined && id !== '') {
          request = objectStore.get(id);
        } else {
          request = objectStore.openCursor();
          isCursor = true;
          if (query) {
            queryParams = self.getQueryParams(collectionName,
              query, (caseSensitiveSearch ? caseSensitiveSearch : 'i'));
          }
        }

        request.onsuccess = (event) => {
          if (!isCursor) {
            const transformfn = self.transformGetByIdMap.get(collectionName);
            let item = request.result;

            if (item && transformfn !== undefined) {
              item = transformfn.call(this, item, this);
            }

            response = self.createResponseOptions(url, item ? STATUS.OK : STATUS.NOT_FOUND, item);
            observer.next(response);
            observer.complete();
          } else {
            const transformfn = self.transformGetAllMap.get(collectionName);
            if (self.getAllItems((event.target as IDBRequest<any>).result, queryResults, queryParams, transformfn)) {
              response = self.createResponseOptions(url, STATUS.OK, queryResults);
              observer.next(response);
              observer.complete();
            }
          }
        };

        request.onerror = (event) => {
          response = self.createErrorResponseOptions(url, STATUS.INTERNAL_SERVER_ERROR, (event.target as any).error);
          observer.error(response);
        };
      }
    });
  }

  get(reqInfo: RequestInfo) {
    let response$: Observable<any>;

    // Caso tenha um interceptador, retorna a resposta do mesmo
    response$ = this.processInterceptResponse(reqInfo, {id: reqInfo.id});
    if (response$) {
      return this.addDelay(response$, reqInfo.utils.getConfig().delay);
    }

    // Caso não tenha a collection, repassa a requisição para o backend verdadeiro
    // Para testes e2e usa o banco de dados em memória mesmo
    if (environment.e2e) {
      if (!this.dbe2e.has(reqInfo.collectionName)) {
        return undefined;
      }
    } else {
      if (!this.db.objectStoreNames.contains(reqInfo.collectionName)) {
        return undefined;
      }
    }

    response$ = this.get$(reqInfo.collectionName, reqInfo.id, reqInfo.query, reqInfo.url,
      reqInfo.utils.getConfig().caseSensitiveSearch ? undefined : 'i');
    return this.addDelay(response$, reqInfo.utils.getConfig().delay);
  }

  put$(collectionName: string, id: any, item: any, url: string): Observable<any> {
    return new Observable((observer) => {
      const self = this;
      let response: any;

      const transformfn = this.transformPutMap.get(collectionName);

      // Para testes e2e usa o banco de dados em memória mesmo
      if (environment.e2e) {
        const objectStore = this.dbe2e.get(collectionName);
        const existingIx = this.indexOf(objectStore, id);
        if (existingIx >= 0) {
          if (transformfn !== undefined) {
            item = transformfn.call(this, objectStore[existingIx], item);
          }
          item = Object.assign({}, objectStore[existingIx], item);
          objectStore[existingIx] = item;
          response = self.createResponseOptions(url, STATUS.NO_CONTENT);
          observer.next(response);
          observer.complete();
        } else {
          response = self.createErrorResponseOptions(url, STATUS.NOT_FOUND,
            '\'' + collectionName + '\' item with id=\'' + id +
            ' not found and may not be created with PUT; use POST instead.');
          observer.error(response);
        }
      } else {
        const objectStore = self.db.transaction(collectionName, 'readwrite').objectStore(collectionName);
        const request = objectStore.get(id);
        request.onsuccess = (event) => {
          if (request.result) {
            if (transformfn !== undefined) {
              item = transformfn.call(this, request.result, item);
            }
            item = Object.assign({}, request.result, item);
            const requestUpdate = objectStore.put(item);
            requestUpdate.onsuccess = () => {
              response = self.createResponseOptions(url, STATUS.NO_CONTENT);
              observer.next(response);
              observer.complete();
            };
            requestUpdate.onerror = (errorEvent) => {
              response = self.createErrorResponseOptions(url, STATUS.INTERNAL_SERVER_ERROR,
                'Erro ao atualizar \'' + collectionName + '\' pelo id: \'' +
                id + '\'', (errorEvent.target as any).error);
              observer.error(response);
            };
          } else {
            response = self.createErrorResponseOptions(url, STATUS.NOT_FOUND,
              '\'' + collectionName + '\' item with id=\'' + id +
              ' not found and may not be created with PUT; use POST instead.');
            observer.error(response);
          }
        };
        request.onerror = (event) => {
          response = self.createErrorResponseOptions(url, STATUS.INTERNAL_SERVER_ERROR,
            'Erro ao buscar \'' + collectionName + '\' pelo id: \'' + id + '\'', (event.target as any).error);
          observer.error(response);
        };
      }
    });
  }

  put(reqInfo: RequestInfo) {
    let response$: Observable<any>;
    const item = this.clone(reqInfo.utils.getJsonBody(reqInfo.req)) || { id: reqInfo.id };

    if (!item.id) {
      item['id'] = reqInfo.id;
    }

    // Caso tenha um interceptador, retorna a resposta do mesmo
    response$ = this.processInterceptResponse(reqInfo, item);
    if (response$) {
      return this.addDelay(response$, reqInfo.utils.getConfig().delay);
    }

    // Caso não tenha a collection, repassa a requisição para o backend verdadeiro
    // Para testes e2e usa o banco de dados em memória mesmo
    if (environment.e2e) {
      if (!this.dbe2e.has(reqInfo.collectionName)) {
        return undefined;
      }
    } else {
      if (!this.db.objectStoreNames.contains(reqInfo.collectionName)) {
        return undefined;
      }
    }

    response$ = this.put$(reqInfo.collectionName, reqInfo.id, item, reqInfo.url);
    return this.addDelay(response$, reqInfo.utils.getConfig().delay);
  }

  post$(collectionName: string, item: any, url: string): Observable<any> {
    return new Observable((observer) => {
      const self = this;
      let response: any;

      if (!item.id) {
        item['id'] = v4();
      }

      const transformfn = this.transformPostMap.get(collectionName);
      if (transformfn !== undefined) {
        item = transformfn.call(this, item, this);
      }

      // Para testes e2e usa o banco de dados em memória mesmo
      if (environment.e2e) {
        const objectStore = this.dbe2e.get(collectionName);
        objectStore.push(item);
        response = self.createResponseOptions(url, STATUS.CREATED, { id: item.id });
        response = response.clone({ headers: response.headers.append('Location', url + '/' + item.id) });
        observer.next(response);
        observer.complete();
      } else {
        const objectStore = self.db.transaction(collectionName, 'readwrite').objectStore(collectionName);
        const request = objectStore.add(item);
        request.onsuccess = (event) => {
          if (request.result) {
            response = self.createResponseOptions(url, STATUS.CREATED, { id: item.id });
            response = response.clone({ headers: response.headers.append('Location', url + '/' + item.id) });
            observer.next(response);
            observer.complete();
          }
        };
        request.onerror = (event) => {
          response = self.createErrorResponseOptions(url, STATUS.INTERNAL_SERVER_ERROR,
            'Erro ao incluir \'' + collectionName + '\' pelo id: \'' + item.id + '\'', (event.target as any).error);
          observer.error(response);
        };
      }
    });
  }

  post(reqInfo: RequestInfo) {
    let response$: Observable<any>;
    const item = this.clone(reqInfo.utils.getJsonBody(reqInfo.req)) || { id: reqInfo.id };
    if (!item.hasOwnProperty('id')) {
      item['id'] = reqInfo.id;
    }

    // Caso tenha um interceptador, retorna a resposta do mesmo
    response$ = this.processInterceptResponse(reqInfo, item);
    if (response$) {
      return this.addDelay(response$, reqInfo.utils.getConfig().delay);
    }

    // Caso não tenha a collection, repassa a requisição para o backend verdadeiro
    // Para testes e2e usa o banco de dados em memória mesmo
    if (environment.e2e) {
      if (!this.dbe2e.has(reqInfo.collectionName)) {
        return undefined;
      }
    } else {
      if (!this.db.objectStoreNames.contains(reqInfo.collectionName)) {
        return undefined;
      }
    }

    response$ = this.post$(reqInfo.collectionName, item, reqInfo.url);
    return this.addDelay(response$, reqInfo.utils.getConfig().delay);
  }

  delete$(collectionName: string, id: any, url: string): Observable<any> {
    return new Observable((observer) => {
      const self = this;
      // Para testes e2e usa o banco de dados em memória mesmo
      if (environment.e2e) {
        const objectStore = this.dbe2e.get(collectionName);
        if (this.removeById(objectStore, id)) {
          const response = self.createResponseOptions(url, STATUS.NO_CONTENT, true);
          observer.next(response);
          observer.complete();
        } else {
          const response = self.createErrorResponseOptions(url, STATUS.NOT_FOUND,
            'Erro ao buscar \'' + collectionName + '\' pelo id: \'' + id + '\'', 'Id não encontrado.');
          observer.error(response);
        }
      } else {
        const objectStore = self.db.transaction(collectionName, 'readwrite').objectStore(collectionName);
        const request = objectStore.delete(id);
        request.onsuccess = (event) => {
          const response = self.createResponseOptions(url, STATUS.NO_CONTENT, true);
          observer.next(response);
          observer.complete();
        };
        request.onerror = (event) => {
          const response = self.createErrorResponseOptions(url, STATUS.INTERNAL_SERVER_ERROR,
            'Erro ao buscar \'' + collectionName + '\' pelo id: \'' + id + '\'', (event.target as any).error);
          observer.error(response);
        };
      }
    });
  }

  delete(reqInfo: RequestInfo) {
    let response$: Observable<any>;

    // Caso tenha um interceptador, retorna a resposta do mesmo
    response$ = this.processInterceptResponse(reqInfo, {id: reqInfo.id});
    if (response$) {
      return this.addDelay(response$, reqInfo.utils.getConfig().delay);
    }

    // Caso não tenha a collection, repassa a requisição para o backend verdadeiro
    // Para testes e2e usa o banco de dados em memória mesmo
    if (environment.e2e) {
      if (!this.dbe2e.has(reqInfo.collectionName)) {
        return undefined;
      }
    } else {
      if (!this.db.objectStoreNames.contains(reqInfo.collectionName)) {
        return undefined;
      }
    }

    response$ = this.delete$(reqInfo.collectionName, reqInfo.id, reqInfo.url);
    return this.addDelay(response$, reqInfo.utils.getConfig().delay);
  }

  private removeById(collection: any[], id: any) {
    const ix = this.indexOf(collection, id);
    if (ix > -1) {
      collection.splice(ix, 1);
      return true;
    }
    return false;
  }

  private compareRequestInterceptor(interceptor: IRequestInterceptor, uriInfo: UriInfo): boolean {
    let interceptorPathOk = true;
    const intPaths = removeTrailingSlash(interceptor.path.trim()).split('/');
    const uriPaths = removeTrailingSlash(uriInfo.path).split('/');
    // Se possui o mesmo número de segmentos na URL
    interceptorPathOk = intPaths.length === uriPaths.length;
    if (interceptorPathOk) {
      // Avalia se todos os segmentos são iguais
      for (let i = 0; i < intPaths.length && interceptorPathOk; i++) {
        // Se é um segmento 'coriga' descarta o mesmo.
        // Utilizado para intercepatar urls tipo: /api/parent/:id/child/:id/action
        if (intPaths[i] === '**') {
          continue;
        }
        interceptorPathOk = intPaths[i] === uriPaths[i];
      }
    }
    if (interceptorPathOk) {
      if (interceptor.query) {
        const interceptorQuery = (interceptor.query instanceof HttpParams) ? interceptor.query.toString() : interceptor.query;
        const uriInfoQuery = uriInfo.query ? decodeURI(uriInfo.query) : '';
        if (interceptorQuery.length < uriInfoQuery.length) {
          return interceptorQuery === uriInfoQuery.substr(0, interceptorQuery.length);
        } else {
          return uriInfoQuery.length ? uriInfoQuery === interceptorQuery.substr(0, uriInfoQuery.length) : true;
        }
      } else {
        return true;
      }
    }
    return false;
  }

  private getResponseUtils(): IResponseUtils {
    return {
      responseFn: this.createResponseOptions.bind(this),
      errorResponseFn: this.createErrorResponseOptions.bind(this)
    };
  }

  private processInterceptResponse(reqInfo: RequestInfo, body?: any): Observable<any> {
    const response = this.interceptResponse(reqInfo, body);
    if (response instanceof Observable) {
      return response;
    }
    if (response !== undefined) {
      return new Observable(observer => {
        if (response instanceof HttpErrorResponse) {
          observer.error(response);
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    }
    return undefined;
  }

  private interceptResponse(reqInfo: RequestInfo, body?: any): HttpResponse<any> | HttpErrorResponse | Observable<any> | undefined {
    let response: HttpResponse<any> | HttpErrorResponse;
    const interceptor: IRequestInterceptor = reqInfo.utils['responseInterceptor'];

    if (interceptor) {
      if (reqInfo.method === interceptor.method.toLocaleLowerCase()) {
        if (interceptor.response) {
          if (interceptor.response instanceof Function) {
            response = interceptor.response.call(this, reqInfo.url, this.responseUtils, body);
          } else if (interceptor.response instanceof HttpResponse ||
            interceptor.response instanceof HttpErrorResponse) {
            response = this.clone(interceptor.response);
          }
        }
      }
      delete reqInfo.utils['responseInterceptor'];
    }
    return response;
  }

  parseRequestUrl(url: string, reqInfoUtils: RequestInfoUtilities): ParsedRequestUrl {
    const self = this;
    const config = reqInfoUtils.getConfig();

    const start = config.host.length;
    for (const item of this.replaceMap.entries()) {
      if (url.includes(item[0], start)) {
        url = url.replace(item[0], item[1]);
        break;
      }
    }

    let parsed: ParsedRequestUrl;
    try {
      parsed = reqInfoUtils.parseRequestUrl(url);
    } catch (err) {
      const msg = 'unable to parse url \'' + url + '\'; original error: ' + err.message;
      throw new Error(msg);
    }

    if (this.requestInterceptors.length > 0) {
      const uriInfo = reqInfoUtils.getLocation(url);
      const interceptor = this.requestInterceptors.find((value) => {
        let intercept = value;
        if (value.path.indexOf('{0}') >= 0 && parsed.id) {
          intercept = this.clone(value);
          intercept.path = intercept.path.replace('{0}', parsed.id);
        }
        return self.compareRequestInterceptor(intercept, uriInfo);
      });
      if (interceptor) {
        reqInfoUtils['responseInterceptor'] = interceptor;
      }
    }
    return parsed;
  }

}
