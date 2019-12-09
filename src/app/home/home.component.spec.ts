import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PoModule } from '@portinari/portinari-ui';
import { User } from 'oidc-client';
import { of } from 'rxjs';
import { configureTestSuite } from 'totvs-log-base-foundation';
import { FndTestModule } from './../mocks/fnd-test-module/fnd-test.module.mock';
import { HomeComponent } from './home.component';

describe('home.component.spec | HomeComponent', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PoModule,
        FndTestModule
      ],
      declarations: [
        HomeComponent
      ]
    });
  });
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('deve instanciar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método para mostrar a mensagem de boas vindas', fakeAsync(() => {
    const usuario: User = { profile: { name: ['jose.aldo', 'José Aldo'] } } as User;
    spyOn<any>(component['autenticacao'], 'getUser').and.returnValue(Promise.resolve(usuario));
    spyOn<any>(component['configuracaoAplicativo']['eventoIdiomaAlterado'], 'subscribe').and.returnValue(of('pt-BR'));
    component['mostraMensagemDeBoasVindas']();
    tick();
    fixture.detectChanges();
    tick();
    expect(component.titulo).toEqual(`${component['global'].i18n.literals.bemVindo}, ${usuario.profile.name[1]}.`);
  }));
});
