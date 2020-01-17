import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { configureTestSuite, click } from 'totvs-log-base-foundation';
import { RouterTestingModule } from '@angular/router/testing';
import { PoModule } from '@portinari/portinari-ui';
import { FndTestModule } from './../../../mocks/fnd-test-module/fnd-test.module.mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AppConfigService } from './../../../app-config.service';
import { AppConfigServiceMock } from './../../../mocks/app-config.service.mock';

import { AlunoListComponent } from './aluno-list.component';
import { AlunoListFormComponent } from './aluno-list-form.component';
import { ListModule } from '@progress/kendo-angular-buttons';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlunoComponent } from '../aluno.component';
import { ControleMatriculaModule } from '../../controle-matricula.module';
//import { AlunoGetAllService } from './../../services/turma-get-by-id.service';

class AlunoListPage {

    // get id() {
    //     return this.query('input[name=\'id\']');
    // }

    //   clickSalvar() { click(this.query('po-button[p-type=\'primary\']'));}

  constructor(private fixture: ComponentFixture<AlunoListComponent>) { }

  query(selector: string) {
    return this.fixture.nativeElement.querySelector(selector);
  }

  queryAll(selector: string) {
    const el = this.fixture.nativeElement.querySelectorAll(selector);
    return el;
  }
}

describe('aluno-list.component.spec | AlunoListComponent', () => {
  let component: AlunoListComponent;
  let fixture: ComponentFixture<AlunoListComponent>;
  let page: AlunoListPage;
  let httpClient: HttpClient;
  let appConfigService: AppConfigService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule.withRoutes([{ path: 'alunos', component: AlunoListComponent }]),
        // PoModule,
        // FndTestModule,
        // FormsModule,
        // ReactiveFormsModule,
        // ListModule
        RouterTestingModule,
        FndTestModule,
        //ListModule,
        SharedModule,
        ControleMatriculaModule
      ],
      declarations: [

      ],
      providers: [
        //{ provide: AppConfigService, useClass: AppConfigServiceMock },
        HttpClient,
      ]
    });
  });

  beforeEach(fakeAsync(async () => {
    fixture = TestBed.createComponent(AlunoListComponent);
    component = fixture.componentInstance;
    page = new AlunoListPage(fixture);
    httpClient = TestBed.get(HttpClient);
    appConfigService = TestBed.get(AppConfigService);

    spyOn(httpClient, 'get').and.returnValue(of({
    //   documentoIdentificacao: '01780828055',
    //   inscricaoEstadual: '919347398',
    //   nome: 'Lucas',
    //   unidadeFederativa: 'SC',
    //   pessoaFisica: true
        nome:  ''
    }));

  }));

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Todos componentes e funções devem estar criados'), fakeAsync( () => {

    expect(component.alunos).toBeTruthy();

    expect(component.alunosGrid).toBeTruthy();
    expect(component.sortable).toBeTruthy();
    expect(component.gridState).toBeTruthy();
    expect(component.selectable).toBeTruthy();
    expect(component.abrirModalAluno).toBeTruthy();

    //alterarIdioma
    //appConfigService.dispararEventoIdiomaAlterado('en-US');

    //abrirModalAluno() 
    //@ViewChild('formAluno', { static: true }) formAluno: AlunoListComponent;

  });

});
