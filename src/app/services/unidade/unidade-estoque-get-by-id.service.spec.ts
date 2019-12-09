import { IUnidadeEstoque } from './../../entidades/unidade-estoque.interface';
import { ControleEstoqueEnum } from './../../entidades/controle-estoque.enum';
import { UnidadeEstoque } from './../../entidades/unidade-estoque.entity';
import { AppConfigServiceMock } from './../../mocks/app-config.service.mock';
import { AppConfigService } from './../../app-config.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { UnidadeEstoqueGetByIdService } from './unidade-estoque-get-by-id.service';

describe('unidade-estoque-get-by-id.service.spec | UnidadeEstoqueGetByIdService', () => {

  let httpTestingController: HttpTestingController;
  let servico: UnidadeEstoqueGetByIdService;
  const id = '38233a57-af95-42a5-86f0-02a3b3bb8da7';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UnidadeEstoqueGetByIdService,
        {
          provide: AppConfigService,
          useClass: AppConfigServiceMock
        }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    servico = TestBed.get(UnidadeEstoqueGetByIdService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Deve instanciar o serviço', () => {
    expect(servico).toBeTruthy();
  });

  it('Deve carregar a unidade estoque com sucesso', (done: DoneFn) => {

    servico.Get(id).subscribe((retorno: UnidadeEstoque) => {

      expect(retorno).toBeDefined();
      expect(retorno.id).toBe(id);
      expect(retorno.controleEstoque).toEqual(ControleEstoqueEnum.UNITIZADOR());
      done();
    });

    httpTestingController.expectOne((req: HttpRequest<IUnidadeEstoque>) =>
      (
        req.url === servico.url.replace('{0}', id) &&
        req.method === 'GET'
      )
    ).flush({
      id,
      controleEstoque: 'UNITIZADOR'
    });
  });

  it('Deve retornar a unidade estoque indefinida quando ocorre erro', (done: DoneFn) => {

    servico.Get(id).subscribe(() => {}, (error) => {
      expect(error).toBeDefined();
      expect(error instanceof HttpErrorResponse).toBeTruthy();
      expect(error.status).toBe(500);
      expect(error.statusText).toBe('erro no servidor');
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
