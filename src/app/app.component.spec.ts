import { UnidadeGetAllService } from './services/unidade/unidade-get-all.service';
import { AppConfigServiceMock } from './mocks/app-config.service.mock';
import { User } from 'oidc-client';
import { AppConfigService } from './app-config.service';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoModule } from '@portinari/portinari-ui';
import { AppComponent } from './app.component';
import { FndTestModule } from './mocks/fnd-test-module/fnd-test.module.mock';
import { configureTestSuite, AuthBaseService } from 'totvs-log-base-foundation';
import { ChangeLanguageComponent } from 'totvs-log-web-foundation';
import { Unidade } from './entidades/unidade.entity';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('app.component.spec | AppComponent', () => {

  const unidadeVazio: Unidade = Unidade.vazio();
  const unidadeExistente: Unidade = new Unidade({
    id: 'b5073c36-1aeb-4759-b652-c78c3a682604',
    nome: 'Teste',
    cnpj: undefined,
    inscricaoEstadual: undefined,
    unidadeFederativa: undefined,
    segmento: 'OPERADOR_LOGISTICO'
  });
  const user: User = { profile: { name: ['Name', 'Fullname'] } } as User;

  let configuracaoAplicativo: AppConfigService;
  let autenticacao: AuthBaseService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let unidadeGetAll: UnidadeGetAllService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        PoModule,
        FndTestModule
      ],
      declarations: [
        AppComponent,
        ChangeLanguageComponent
      ],
      providers: [
        {
          provide: AppConfigService,
          useClass: AppConfigServiceMock
        }
      ]
    });
  });

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    configuracaoAplicativo = TestBed.get(AppConfigService);
    autenticacao = TestBed.get(AuthBaseService);
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
    unidadeGetAll = TestBed.get(UnidadeGetAllService);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('Deve instanciar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve retornar a descrição da Unidade', () => {
    const descricaoUnidade = component.getDescricaoUnidadePerfilUsuario(unidadeExistente);
    expect(descricaoUnidade).toBe('Unidade Teste');
  });

  it('Não deve retornar a descrição da Unidade', () => {
    const descricaoUnidade = component.getDescricaoUnidadePerfilUsuario(unidadeVazio);
    expect(descricaoUnidade).toBe('');
  });

  it('Deve definir o perfil do Usuário', () => {

    spyOn(configuracaoAplicativo, 'getUnidadeAtual').and.returnValue(unidadeExistente);

    expect(component.informacoesPerfilUsuario).toBeUndefined();
    expect(component.acoesPerfilUsuario).toBeUndefined();

    component.definirPerfilUsuario(user);

    expect(component.informacoesPerfilUsuario).toEqual({
      avatar: 'assets/images/totvs-logo-user.svg',
      title: 'Fullname',
      subtitle: 'Unidade Teste'
    });
    expect(component.acoesPerfilUsuario.length).toBe(2);
  });

  it('Deve chamar a ação da modal de troca de idioma', () => {

    spyOn(component.modalTrocarIdioma, 'openChangeLanguageModal');

    component.definirPerfilUsuario(user);
    component.acoesPerfilUsuario[0].action();

    expect(component.modalTrocarIdioma.openChangeLanguageModal).toHaveBeenCalledTimes(1);
  });

  it('Deve chamar a ação de Logout', () => {

    spyOn(autenticacao, 'logoutFlow');

    component.definirPerfilUsuario(user);
    component.acoesPerfilUsuario[1].action();

    expect(autenticacao.logoutFlow).toHaveBeenCalledTimes(1);
  });

  it('Deve definir os itens de menu', () => {

    expect(component.itensMenu).toEqual([]);

    component.definirItensMenu(user);

    expect(component.itensMenu.length).toBe(6);
  });

  it('Deve navegar para a rota de configuração inicial', async () => {

    spyOn(router, 'navigate').and.returnValue(of(true).toPromise());

    await component.navegarParaConfiguracaoInicial();

    expect(router.navigate).toHaveBeenCalledWith(['./configuracaoInicial'], {
      relativeTo: activatedRoute
    });
  });

  it('Deve navegar para a rota armazenada quando existente', async () => {

    spyOn(localStorage, 'getItem').and.returnValue('rota-armazenada');
    spyOn(history, 'pushState');
    const spyNavigate = spyOn(router, 'navigate').and.returnValue(of(true).toPromise());

    await component.navegarParaRotaArmazenada();

    expect(localStorage.getItem).toHaveBeenCalledWith('current.route');
    expect(history.pushState).toHaveBeenCalledWith(undefined, 'TOTVS WMS', 'rota-armazenada');
    expect(spyNavigate.calls.allArgs()).toEqual([[['home']], [['rota-armazenada']]]);
    expect(spyNavigate).toHaveBeenCalledTimes(2);
  });

  it('Deve navegar para a rota Home quando a rota armazenada é de Configuração Inicial e a unidade está definida', async () => {

    component.unidadeAtual = unidadeExistente;

    spyOn(localStorage, 'getItem').and.returnValue('configuracaoInicial');
    spyOn(history, 'pushState');
    spyOn(router, 'navigate').and.returnValue(of(true).toPromise());

    await component.navegarParaRotaArmazenada();

    expect(localStorage.getItem).toHaveBeenCalledWith('current.route');
    expect(history.pushState).toHaveBeenCalledWith(undefined, 'TOTVS WMS', 'home');
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('Deve navegar para a rota Home quando não há rota armazenada', async () => {

    spyOn(localStorage, 'getItem').and.returnValue(undefined);
    spyOn(history, 'pushState');
    spyOn(router, 'navigate').and.returnValue(of(true).toPromise());

    await component.navegarParaRotaArmazenada();

    expect(localStorage.getItem).toHaveBeenCalledWith('current.route');
    expect(history.pushState).toHaveBeenCalledWith(undefined, 'TOTVS WMS', 'home');
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('Deve identificar a Unidade quando existir', async () => {

    spyOn(unidadeGetAll, 'getAll').and.returnValue(of([unidadeExistente]));
    spyOn(configuracaoAplicativo, 'dispararEventoUnidadeAlterada');

    expect(await component.identificarUnidadeAtual()).toEqual(unidadeExistente);

    expect(unidadeGetAll.getAll).toHaveBeenCalledTimes(1);
    expect(configuracaoAplicativo.dispararEventoUnidadeAlterada).toHaveBeenCalledWith(unidadeExistente);
  });

  it('Deve retornar a Unidade indefinida quando não existir', async () => {

    spyOn(unidadeGetAll, 'getAll').and.returnValue(of([]));
    spyOn(configuracaoAplicativo, 'dispararEventoUnidadeAlterada');

    expect(await component.identificarUnidadeAtual()).toBeUndefined();

    expect(unidadeGetAll.getAll).toHaveBeenCalledTimes(1);
    expect(configuracaoAplicativo.dispararEventoUnidadeAlterada).not.toHaveBeenCalled();
  });

  it('Deve retornar a Unidade indefinida quando ocorrer erro na requisição', async () => {

    spyOn(unidadeGetAll, 'getAll').and.returnValue(throwError('error'));
    spyOn(configuracaoAplicativo, 'dispararEventoUnidadeAlterada');

    expect(await component.identificarUnidadeAtual()).toBeUndefined();

    expect(unidadeGetAll.getAll).toHaveBeenCalledTimes(1);
    expect(configuracaoAplicativo.dispararEventoUnidadeAlterada).not.toHaveBeenCalled();
  });

  it('Deve navegar para a configuração inicial quando a unidade não estivar definida', fakeAsync(() => {

    spyOn(component, 'identificarUnidadeAtual').and.returnValue(of(unidadeVazio).toPromise());
    spyOn(component, 'navegarParaRotaArmazenada');
    spyOn(component, 'navegarParaConfiguracaoInicial');

    component.tratarNavegacao();
    tick();

    expect(component.identificarUnidadeAtual).toHaveBeenCalledTimes(1);
    expect(component.navegarParaRotaArmazenada).not.toHaveBeenCalled();
    expect(component.navegarParaConfiguracaoInicial).toHaveBeenCalledTimes(1);
  }));

  it('Deve navegar para a rota armazenada quando a unidade estivar definida', fakeAsync(() => {

    spyOn(component, 'identificarUnidadeAtual').and.returnValue(of(unidadeExistente).toPromise());
    spyOn(component, 'navegarParaRotaArmazenada');
    spyOn(component, 'navegarParaConfiguracaoInicial');

    component.tratarNavegacao();
    tick();

    expect(component.identificarUnidadeAtual).toHaveBeenCalledTimes(1);
    expect(component.navegarParaRotaArmazenada).toHaveBeenCalledTimes(1);
    expect(component.navegarParaConfiguracaoInicial).not.toHaveBeenCalled();
  }));

  it('Deve tratar a autenticação efetuada quando receber o evento', fakeAsync(() => {

    spyOn(component, 'definirItensMenu');
    spyOn(component, 'definirPerfilUsuario');
    spyOn(component, 'tratarNavegacao');

    component.tratarAutenticacaoEfetuada();

    autenticacao.userLoadedEvent.emit(user);

    tick();

    expect(component.definirItensMenu).toHaveBeenCalledWith(user);
    expect(component.definirPerfilUsuario).toHaveBeenCalledWith(user);
    expect(component.tratarNavegacao).not.toHaveBeenCalledTimes(1);
  }));

  it('Deve gravar a rota atual quando receber evento de início de navegação', fakeAsync(() => {

    spyOn(localStorage, 'setItem').and.callThrough();

    component.gravarRotaAtual();

    const event = new NavigationStart(42, '/home');
    TestBed.get(Router).events.next(event);
    tick();

    expect(localStorage.setItem).toHaveBeenCalledWith('current.route', '/home');
  }));

  it('Não deve gravar a rota atual quando inválida', fakeAsync(() => {

    let event;

    spyOn(localStorage, 'setItem').and.callThrough();

    component.gravarRotaAtual();

    event = new NavigationStart(42, '');
    TestBed.get(Router).events.next(event);
    tick();

    event = new NavigationStart(42, '/');
    TestBed.get(Router).events.next(event);
    tick();

    event = new NavigationStart(42, '/auth-callback');
    TestBed.get(Router).events.next(event);
    tick();

    expect(localStorage.setItem).not.toHaveBeenCalled();
  }));

  it('Deve ajustar os componentes após trocar o idioma', async () => {

    spyOn(autenticacao, 'getUser').and.returnValue(of(user).toPromise());
    spyOn(component, 'definirItensMenu');
    spyOn(component, 'definirPerfilUsuario');
    spyOn(configuracaoAplicativo, 'dispararEventoIdiomaAlterado');

    await component.ajustarComponentesAposTrocarIdioma('novoIdioma');

    expect(autenticacao.getUser).toHaveBeenCalledTimes(1);
    expect(component.definirItensMenu).toHaveBeenCalledWith(user);
    expect(component.definirPerfilUsuario).toHaveBeenCalledWith(user);
    expect(configuracaoAplicativo.dispararEventoIdiomaAlterado).toHaveBeenCalledWith('novoIdioma');
  });

  it('Deve inicializar o componente', () => {

    spyOn(component, 'gravarRotaAtual');
    spyOn(component, 'tratarAutenticacaoEfetuada');

    component.ngOnInit();

    expect(component.gravarRotaAtual).toHaveBeenCalledTimes(1);
    expect(component.tratarAutenticacaoEfetuada).toHaveBeenCalledTimes(1);
  });

  it('Deve ajustar aplicação quando receber o evento de unidade alterada', () => {

    spyOn(component, 'gravarRotaAtual');
    spyOn(component, 'tratarAutenticacaoEfetuada');

    component.ngOnInit();

    expect(component.unidadeAtual).toEqual(unidadeVazio);
    expect(component.informacoesPerfilUsuario).toBeUndefined();

    component.informacoesPerfilUsuario = {
      title: '',
      subtitle: ''
    };

    configuracaoAplicativo.dispararEventoUnidadeAlterada(unidadeExistente);

    expect(component.unidadeAtual).toEqual(unidadeExistente);
    expect(component.informacoesPerfilUsuario).toEqual({
      title: '',
      subtitle: 'Unidade Teste'
    });
  });

  it('Deve ajustar a apresentação do menu quando receber o evento apresentar menu', () => {

    spyOn(component, 'gravarRotaAtual');
    spyOn(component, 'tratarAutenticacaoEfetuada');

    component.ngOnInit();

    expect(component.apresentarMenu).toBeTruthy();

    configuracaoAplicativo.dispararEventoApresentarMenu(false);

    expect(component.apresentarMenu).toBeFalsy();

    configuracaoAplicativo.dispararEventoApresentarMenu(true);

    expect(component.apresentarMenu).toBeTruthy();
  });
});
