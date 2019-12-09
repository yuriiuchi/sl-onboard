import { IUnidade } from './../../entidades/unidade.interface';
import { Unidade } from './../../entidades/unidade.entity';
import { SegmentoEnum } from './../../entidades/segmento.enum';
import { AppConfigServiceMock } from './../../mocks/app-config.service.mock';
import { AppConfigService } from './../../app-config.service';
import { UnidadeGetByIdService } from './unidade-get-by-id.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { UnidadeFederativa } from './../../entidades/unidade-federativa.enum';

describe('unidade-get-by-id.service.spec | UnidadeGetByIdService', () => {

  let httpTestingController: HttpTestingController;
  let servico: UnidadeGetByIdService;
  const id = '38233a57-af95-42a5-86f0-02a3b3bb8da7';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UnidadeGetByIdService,
        {
          provide: AppConfigService,
          useClass: AppConfigServiceMock
        }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    servico = TestBed.get(UnidadeGetByIdService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Deve instanciar o serviço', () => {
    expect(servico).toBeTruthy();
  });

  it('Deve carregar a unidade com sucesso', (done: DoneFn) => {

    servico.Get(id).subscribe((retorno: Unidade) => {

      expect(retorno).toBeDefined();
      expect(retorno.id).toBe('6356e21f-84f7-4a3f-b4f1-6da4c159b510');
      expect(retorno.nome).toBe('Teste');
      expect(retorno.cnpj).toBe('63607693000103');
      expect(retorno.inscricaoEstadual).toBe('823776859');
      expect(retorno.unidadeFederativa).toBe(UnidadeFederativa.SC);
      expect(retorno.segmento).toEqual(SegmentoEnum.OPERADOR_LOGISTICO());
      done();
    });

    httpTestingController.expectOne((req: HttpRequest<IUnidade>) =>
      (
        req.url === servico.url.replace('{0}', id) &&
        req.method === 'GET'
      )
    ).flush(
      {
        id: '6356e21f-84f7-4a3f-b4f1-6da4c159b510',
        nome: 'Teste',
        cnpj: '63607693000103',
        inscricaoEstadual: '823776859',
        unidadeFederativa: 'SC',
        segmento: 'OPERADOR_LOGISTICO'
      }
    );
  });

  it('Deve retornar a unidade indefinida quando ocorre erro', (done: DoneFn) => {

    servico.tentativaRequisicao.codigosRespostaDesconsiderados.push(500);
    servico.Get(id).subscribe((retorno) => {
      expect(retorno).toBeUndefined();
      done();
    });

    httpTestingController.expectOne(
      servico.url.replace('{0}', id)
    ).flush(
      '',
      { status: 500, statusText: 'erro no servidor' }
    );
  });
});
