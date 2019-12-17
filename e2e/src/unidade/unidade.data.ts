import { dataService } from './../../../src/app/memory/data-service/data-service-mapper';
import { InMemoryDataService, ResponseInterceptorFn, IResponseUtils } from './../../../src/app/memory/data-service/in-memory-data.service';
import { collectionName, unidades } from './unidade.mock';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

dataService(collectionName, (dbService: InMemoryDataService) => {

  dbService.addReplaceUrl('unidade/unidades', collectionName);
  dbService.addReplaceUrl('unidadeQuery/unidades', collectionName);

  dbService.addSearchTermMap(collectionName, ['nome']);

  const responseCriarUnidade: ResponseInterceptorFn = (url: string, utils: IResponseUtils, body?: any): any => {
    return dbService.post$(collectionName, body, url).pipe(
      mergeMap((res) => {
        return new Observable(observer => {

        });
      }),
      mergeMap((res) => {
        return new Observable(observer => {

        });
      })
    );
  };

  dbService.addRequestInterceptor({
    method: 'POST',
    path: `/api/v1/${collectionName}`,
    response: responseCriarUnidade
  });

  if (window.location.pathname !== '/configuracaoInicial') {
    unidades.forEach(unidade => {
      dbService.storeData(collectionName, unidade).then((id) => {

      });
    });
  }
});
