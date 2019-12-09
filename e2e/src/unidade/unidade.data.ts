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
          // estruturasFisicasPadroes.forEach((item, index) => {
          //   item['id'] = undefined;
          //   item['unidadeId'] = res.body.id;
          //   dbService.storeData(collectionEstruturas, item).then(() => {
          //     if (index === (estruturasFisicasPadroes.length - 1)) {
          //       observer.next(res);
          //       observer.complete();
          //     }
          //   }, err => observer.error(err));
          // });
        });
      }),
      mergeMap((res) => {
        return new Observable(observer => {
          // dbService.storeData(collectionUnidadesEstoque, {
          //   id: res['body'].id,
          //   controleEstoque: 'UNITIZADOR'
          // }).then(() => {
          //   observer.next(res);
          //   observer.complete();
          // }, err => observer.error(err));
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
        // console.log('Inserido ' + collectionName + ' com id: ' + id);
      });
    });
  }
});
