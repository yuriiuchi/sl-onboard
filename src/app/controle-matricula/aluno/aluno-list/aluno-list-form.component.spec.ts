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

import { AlunoListFormComponent } from './aluno-list-form.component';
import { ListModule } from '@progress/kendo-angular-buttons';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlunoComponent } from '../aluno.component';
import { ControleMatriculaModule } from '../../controle-matricula.module';
import { AlunoGetAllService } from '../services/aluno-get-all.service';
import { Aluno } from '../entities/aluno.entity';
import { AlunoIncluirService } from '../services/aluno-incluir.service';
//import { AlunoGetAllService } from './../../services/turma-get-by-id.service';

class AlunoListFormPage {

    // get id() {
    //     return this.query('input[name=\'id\']');
    // }

    //   clickSalvar() { click(this.query('po-button[p-type=\'primary\']'));}

  constructor(private fixture: ComponentFixture<AlunoListFormComponent>) { }

  query(selector: string) {
    return this.fixture.nativeElement.querySelector(selector);
  }

  queryAll(selector: string) {
    const el = this.fixture.nativeElement.querySelectorAll(selector);
    return el;
  }
}

describe('aluno-list-form.component.spec | AlunoListFormComponent', () => {
  let component: AlunoListFormComponent;
  let fixture: ComponentFixture<AlunoListFormComponent>;
  let page: AlunoListFormPage;
  let httpClient: HttpClient;
  let appConfigService: AppConfigService;
  let alunoGetAllService: AlunoGetAllService;
  //let alunoIncluirService: AlunoIncluirService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FndTestModule,
        SharedModule,
        ControleMatriculaModule
      ],
      declarations: [

      ],
      providers: [
        HttpClient,
      ]
    });
  });

  beforeEach(fakeAsync(async () => {
    fixture = TestBed.createComponent(AlunoListFormComponent);
    component = fixture.componentInstance;
    page = new AlunoListFormPage(fixture);
    httpClient = TestBed.get(HttpClient);
    appConfigService = TestBed.get(AppConfigService);
    alunoGetAllService = TestBed.get(AlunoGetAllService);
  }));

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Todos componentes e funções devem estar criados', fakeAsync( () => {
    expect(component.modalAluno).toBeTruthy();
    expect(component.alunosSelecionados).toBeTruthy();
    expect(component.sortable).toBeTruthy();
    expect(component.gridState).toBeTruthy();
    expect(component.alterarIdioma).toBeTruthy();
    expect(component.abrirModalAluno).toBeTruthy();
    expect(component.carregarAlunos).toBeTruthy();
    expect(component.alteracaoEstadoDados).toBeTruthy();
    expect(component.onSelectedKeysChange).toBeTruthy();
    expect(component.dataStateChange).toBeTruthy();
    expect(component.gridState).toBeTruthy();
    expect(component.global).toBeTruthy();
  }));

  it('Deve carregar a lista de alunos', fakeAsync(() => {
    const alunos = [
      new Aluno('001', 'aluno 01', 'email01@gmail.com', '02937451969', 'mat001', 'vestibular'),
      new Aluno('001', 'aluno 02', 'email02@gmail.com', '02937451970', 'mat002', 'vestibular'),
      new Aluno('001', 'aluno 03', 'email03@gmail.com', '02937451971', 'mat003', 'vestibular'),
    ];

    const spyGetAll =
      spyOn(alunoGetAllService, 'reset')
        .and
        .returnValue(of(alunos));

    component.carregarAlunos();

    expect(component.alunos.length).toEqual(3);
    expect(spyGetAll).toHaveBeenCalled();
  }));

  // it('Deve carregar o Grid', fakeAsync( () => {
  //   //alunosGrid: GridDataResult = { data: [], total: 0 };

    
  // }));

  // it('Deve salvar um Aluno', fakeAsync(() => {
  //   const aluno = new Aluno('001', 'aluno 01', 'email01@gmail.com', '02937451969', 'mat001', 'vestibular');
  //   const spyGetAll =
  //     spyOn(alunoIncluirService, 'Post')
  //       .and
  //       .returnValue(of(aluno));

    
  //   expect(spyGetAll).toHaveBeenCalled();
  // }));


  // it('Deve apresentar os campos para Turma', fakeAsync(() => {
  //   component.formTurmaSimples.patchValue({ descricao: 'Turma teste salvar'});;
  //   component.formTurmaSimples.patchValue({ nrVagas: '10'});
  //   component.formTurmaSimples.patchValue({ inicio: new Date()});

  //   expect(component.descricao).toBeTruthy();
  //   expect(component.nrVagas).toBeTruthy();
  //   expect(component.inicio).toBeTruthy();
  // }));

});
