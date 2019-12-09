import { IListDto } from 'totvs-log-base-foundation';
import { UnidadeFederativa } from './../../entidades/unidade-federativa.enum';
import { AppConfigServiceMock } from './../../mocks/app-config.service.mock';
import { AppConfigService } from './../../app-config.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { UnidadeGetAllService } from './unidade-get-all.service';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { SegmentoEnum } from './../../entidades/segmento.enum';
import { IUnidade } from './../../entidades/unidade.interface';
import { HttpRequest } from '@angular/common/http';

describe('unidade-get-all.service.spec | UnidadeGetAllService', () => {

  let httpTestingController: HttpTestingController;
  let servico: UnidadeGetAllService;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UnidadeGetAllService,
        {
          provide: AppConfigService,
          useClass: AppConfigServiceMock
        }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    servico = TestBed.get(UnidadeGetAllService);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Deve criar o serviço', () => {

    expect(servico).toBeTruthy();
    expect(servico.hasNext).toBeFalsy();
    expect(servico.items).toEqual([]);
    expect(servico.page).toBe(1);
    expect(servico.pageSize).toBe(10);
  });

  it('Deve carregar unidades com sucesso', (done: DoneFn) => {

    const data = {
      hasNext: false,
      items: [
        {
          id: '6356e21f-84f7-4a3f-b4f1-6da4c159b510',
          nome: 'Teste',
          cnpj: '63607693000103',
          inscricaoEstadual: '823776859',
          unidadeFederativa: 'SC',
          segmento: 'OPERADOR_LOGISTICO'
        }
      ]
    };

    servico.getAll().subscribe((lista) => {
      expect(lista.length).toEqual(1);
      expect(lista[0].id).toBe('6356e21f-84f7-4a3f-b4f1-6da4c159b510');
      expect(lista[0].nome).toBe('Teste');
      expect(lista[0].cnpj).toBe('63607693000103');
      expect(lista[0].inscricaoEstadual).toBe('823776859');
      expect(lista[0].unidadeFederativa).toBe(UnidadeFederativa.SC);
      expect(lista[0].segmento).toEqual(SegmentoEnum.OPERADOR_LOGISTICO());
      done();
    });

    httpTestingController
      .expectOne((req: HttpRequest<IListDto<IUnidade>>) => {
        return req.url === servico.urlGetAll && req.method === 'GET';
      })
      .flush(data);
  });

  it('Deve carregar mais resultados com sucesso', (done: DoneFn) => {

    const data = {
      hasNext: true,
      items: [
        {
          id: '6356e21f-84f7-4a3f-b4f1-6da4c159b510',
          nome: 'Teste',
          cnpj: '63607693000103',
          inscricaoEstadual: '823776859',
          unidadeFederativa: 'SC',
          segmento: 'OPERADOR_LOGISTICO'
        }
      ]
    };

    const dataMais = {
      hasNext: false,
      items: [
        {
          id: '6356e21f-84f7-4a3f-b4f1-6da4c159b509',
          nome: 'Teste 2',
          cnpj: '63607693000101',
          inscricaoEstadual: '823776851',
          unidadeFederativa: 'SP',
          segmento: 'DISTRIBUIDOR'
        }
      ]
    };

    servico.getAll().subscribe(() => {
      servico.more().subscribe((mais) => {
        expect(mais.length).toEqual(2);
        expect(mais[1].id).toBe('6356e21f-84f7-4a3f-b4f1-6da4c159b509');
        expect(mais[1].nome).toBe('Teste 2');
        expect(mais[1].cnpj).toBe('63607693000101');
        expect(mais[1].inscricaoEstadual).toBe('823776851');
        expect(mais[1].unidadeFederativa).toBe(UnidadeFederativa.SP);
        expect(mais[1].segmento).toEqual(SegmentoEnum.DISTRIBUIDOR());
        done();
      });
    });

    httpTestingController
      .expectOne((req: HttpRequest<IListDto<IUnidade>>) => {
        return req.url === servico.urlGetAll && req.method === 'GET' && req.urlWithParams.indexOf('page=1') > -1;
      })
      .flush(data);

    httpTestingController
      .expectOne((req: HttpRequest<IListDto<IUnidade>>) => {
        return req.url === servico.urlGetAll && req.method === 'GET' && req.urlWithParams.indexOf('page=2') > -1;
      })
      .flush(dataMais);
  });

  it('Deve retornar lista vazia quando a requisição de GetAll retorna erro', (done: DoneFn) => {

    servico.getAll().subscribe((retorno) => {
      expect(retorno).toEqual([]);
      done();
    });

    httpTestingController
      .expectOne((req: HttpRequest<IListDto<IUnidade>>) => {
        return req.url === servico.urlGetAll && req.method === 'GET';
      })
      .flush(
        '',
        { status: 500, statusText: 'erro no servidor' }
      );
  });

  it('Deve retornar lista vazia quando a requisição de More retorna erro', (done: DoneFn) => {

    const data = {
      hasNext: true,
      items: []
    };

    servico.getAll().subscribe(() => {
      servico.more().subscribe((maisRetorno) => {
        expect(maisRetorno).toEqual([]);
        done();
      });
    });

    httpTestingController
      .expectOne((req: HttpRequest<IListDto<IUnidade>>) => {
        return req.url === servico.urlGetAll && req.method === 'GET' && req.urlWithParams.indexOf('page=1') > -1;
      })
      .flush(data);

    httpTestingController
      .expectOne((req: HttpRequest<IListDto<IUnidade>>) => {
        return req.url === servico.urlGetAll && req.method === 'GET' && req.urlWithParams.indexOf('page=2') > -1;
      })
      .flush(
        '',
        { status: 500, statusText: 'erro no servidor' }
      );
  });
});
