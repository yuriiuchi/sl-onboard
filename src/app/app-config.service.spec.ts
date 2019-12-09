import { FndTestModule } from './mocks/fnd-test-module/fnd-test.module.mock';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppConfigService, appConfigLocation } from './app-config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { configureTestSuite, CriticalError, AuthBaseService } from 'totvs-log-base-foundation';
import { IAppConfig } from './entidades/app-config.interface';
import { Unidade } from './entidades/unidade.entity';

describe('app-config.service.spec | AppConfigService', () => {

  const appConfig: IAppConfig = {
    urlAutoridadeRAC: 'http://rac.totvs.com.br/totvs.rac',
    idClienteRAC: 'wms',
    urlWMS: {
      unidade: 'http://backend.totvs.com.br/unidade',
      unidadeQuery: 'http://backend.totvs.com.br/unidadeQuery',
      endereco: 'http://backend.totvs.com.br/endereco',
      documento: 'http://backend.totvs.com.br/documento',
      documentoQuery: 'http://backend.totvs.com.br/documentoQuery',
      recebimento: 'http://backend.totvs.com.br/recebimento',
      recebimentoQuery: 'http://backend.totvs.com.br/recebimentoQuery',
      estoque: 'http://backend.totvs.com.br/estoque',
      estoqueQuery: 'http://backend.totvs.com.br/estoqueQuery',
      expedicao: 'http://backend.totvs.com.br/expedicao',
      expedicaoQuery: 'http://backend.totvs.com.br/expedicaoQuery',
      selecaoEstoque: 'http://backend.totvs.com.br/selecaoEstoque',
      separacao: 'http://backend.totvs.com.br/separacao',
      conferenciaExp: 'http://backend.totvs.com.br/conferenciaExp'
    }
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FndTestModule
      ],
      providers: [
        AppConfigService
      ]
    });
  });

  let service: AppConfigService;
  let autenticacao: AuthBaseService;

  beforeEach(() => {
    service = TestBed.get(AppConfigService);
    autenticacao = TestBed.get(AuthBaseService);
  });

  it('deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
    expect(service.eventoIdiomaAlterado).toBeDefined();
    expect(service.eventoUnidadeAlterada).toBeDefined();
    expect(service.eventoApresentarMenu).toBeDefined();
    expect(service.apresentarMenu).toBeTruthy();
  });

  it('Deve inicializar a aplicação com as configurações', fakeAsync(() => {

    spyOn<any>(service['http'], 'get').and.callFake(() => of(appConfig));
    service.loadAppConfig();
    tick();
    expect(service.getUnidadeAtual()).toEqual(Unidade.vazio());
    expect(service.configuracoes).toEqual(appConfig);
    expect(service['http'].get).toHaveBeenCalledWith(appConfigLocation);
  }));

  it('Deve lançar uma exceção caso não encontre o arquivo appConfig.json', fakeAsync(() => {

    spyOn<any>(service['http'], 'get').and.callFake(() => throwError(new CriticalError('appConfig.json não encontrado')));
    spyOn(service, 'loadAppConfig').and.callThrough();
    try {
      service.loadAppConfig();
      tick();
    } catch (error) {
      expect(service.loadAppConfig).toThrow();
    }
  }));

  it('Deve lançar uma exceção caso ocorra erro na autenticação', fakeAsync(() => {

    spyOn<any>(service['http'], 'get').and.callFake(() => of(appConfig));
    spyOn(autenticacao, 'changeAuthSettings').and.throwError('Error');
    spyOn(service, 'loadAppConfig').and.callThrough();
    try {
      service.loadAppConfig();
      tick();
    } catch (error) {
      expect(service.loadAppConfig).toThrow();
    }
  }));

  it('Deve emitir o evento com o novo idioma', () => {

    const novoIdioma = 'en-US';
    spyOn<any>(service['_eventoIdiomaAlterado'], 'emit').and.callFake(() => { });

    service.dispararEventoIdiomaAlterado(novoIdioma);
    expect(service['_eventoIdiomaAlterado'].emit).toHaveBeenCalledWith(novoIdioma);
  });

  it('Deve emitir o evento com a nova unidade', () => {

    const novaUnidade: Unidade = Unidade.vazio();
    novaUnidade.id = '2';

    spyOn<any>(service['_eventoUnidadeAlterada'], 'emit').and.callFake(() => { });

    service.dispararEventoUnidadeAlterada(novaUnidade);
    expect(service['_eventoUnidadeAlterada'].emit).toHaveBeenCalledWith(novaUnidade);
  });

  it('Deve emitir o evento para apresentar o menu', () => {

    spyOn<any>(service['_eventoApresentarMenu'], 'emit').and.callFake(() => { });

    service.dispararEventoApresentarMenu(false);
    expect(service['_eventoApresentarMenu'].emit).toHaveBeenCalledWith(false);

    service.dispararEventoApresentarMenu(true);
    expect(service['_eventoApresentarMenu'].emit).toHaveBeenCalledWith(true);
  });
});
