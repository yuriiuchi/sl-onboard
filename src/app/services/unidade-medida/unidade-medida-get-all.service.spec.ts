import { TestBed } from '@angular/core/testing';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfigService } from '../../app-config.service';
import { AppConfigServiceMock } from '../../mocks/app-config.service.mock';
import { IListDto } from 'totvs-log-base-foundation';
import { HttpRequest } from '@angular/common/http';
import { UnidadeMedidaGetAllService } from './unidade-medida-get-all.service';
import { of } from 'rxjs';
import { PoComboOption } from '@portinari/portinari-ui';
import { ITipoEstoque } from '../../entities/tipo-estoque/tipo-estoque.interface';
import { IUnidadeMedida } from './../../../app/entities/unidade-medida/unidade-medida.interface';

describe('unidade-medida-get-all.service.spec | UnidadeMedidaGetAllService', () => {

  let httpTestingController: HttpTestingController;
  let servico: UnidadeMedidaGetAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UnidadeMedidaGetAllService,
        {
          provide: AppConfigService,
          useClass: AppConfigServiceMock
        }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    servico = TestBed.get(UnidadeMedidaGetAllService);
  });

  it('Deve criar o serviço', () => {
    expect(servico).toBeTruthy();

    expect(servico.page).toBe(1);
    expect(servico.pageSize).toBe(10);
    expect(servico.hasNext).toBeFalsy();
  });

  it('Deve retornar unidades de medida com sucesso', (done: DoneFn) => {

    const data = {
      hasNext: false,
      items: [{
        codigo: '123'
      }]
    };

    servico.getAll().subscribe((lista: any) => {
      expect(lista.length).toEqual(1);
      expect(lista[0].codigo).toEqual(data.items[0].codigo);
      done();
    });

    httpTestingController.expectOne(
      (req: HttpRequest<IListDto<ITipoEstoque>>) => {
        return (req.url === servico.urlGetAll && req.method === 'GET');
      }).flush(data);
  });

  it('Deve retornar unidades de medida filtrados', (done: DoneFn) => {

    const data = {
      hasNext: false,
      items: [{
        codigo: '123'
      }]
    };

    const filtro = [];
    filtro['codigo'] = '123';

    servico.reset().subscribe((lista: any) => {
      expect(lista.length).toEqual(1);
      expect(lista[0].codigo).toEqual(data.items[0].codigo);
      done();
    });

    httpTestingController.expectOne(
      (req: HttpRequest<IListDto<ITipoEstoque>>) => {
        return (req.url === servico.urlGetAll && req.method === 'GET');
      }).flush(data);
  });

  it('Deve chamar o método responsável por carregar as próximas páginas', (done: DoneFn) => {

    const data: IUnidadeMedida[] = [{
      codigo: '123'
    }];


    const spyMore = spyOn(servico['mappedGetAll'], 'more');
    spyMore.and.returnValue(of(data));

    servico.more().subscribe(lista => {
      expect(lista.length).toBe(1);
      done();
    });
  });

  it('Deve buscar todos as unidades de medida para o combo', (done: DoneFn) => {

    const items = [{
      codigo: '123'
    }];

    servico.getFilteredData({ property: '', value: '' }).subscribe((retorno: Array<PoComboOption>) => {
      expect(retorno).toBeDefined();
      expect(retorno.length).toBe(items.length);
      expect(retorno[0].value).toBe(items[0].codigo);
      expect(retorno[0].label).toBe('123');
      done();
    });

    httpTestingController.expectOne((req: HttpRequest<Array<any>>) =>
      (
        req.url === servico.urlGetAll &&
        req.method === 'GET'
      )
    ).flush({ items });
  });

  it('Deve buscar uma unidade pela busca no combo', (done: DoneFn) => {

    const items = [{
      codigo: '123'
    }];

    servico.getFilteredData({ property: 'label', value: 'UN' }).subscribe((retorno: Array<PoComboOption>) => {
      expect(retorno).toBeDefined();
      expect(retorno.length).toBe(1);
      expect(retorno[0].value).toBe('123');
      expect(retorno[0].label).toBe('123');
      done();
    });

    httpTestingController.expectOne(
      (req: HttpRequest<IListDto<ITipoEstoque>>) => {
        return (
          req.url === servico.urlGetAll &&
          req.method === 'GET' &&
          req.params.get('codigo') === 'UN');
      }).flush({ items });

  });

});
