import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { configureTestSuite, click } from 'totvs-log-base-foundation';
import { RouterTestingModule } from '@angular/router/testing';
import { FndTestModule } from './../../mocks/fnd-test-module/fnd-test.module.mock';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AppConfigService } from './../../app-config.service';

import { SharedModule } from 'src/app/shared/shared.module';
import { AlunoComponent } from './aluno.component';
import { ControleMatriculaModule } from './../controle-matricula.module';
import { Aluno } from './entities/aluno.entity';
import { AlunoIncluirService } from './services/aluno-incluir.service';
import { AlunoGetByIdService } from './services/aluno-get-by-id.service';

class AlunoPage {
  constructor(private fixture: ComponentFixture<AlunoComponent>) { }

}

describe('aluno.component.spec | AlunoComponent', () => {
  let component: AlunoComponent;
  let fixture: ComponentFixture<AlunoComponent>;
  let page: AlunoPage;
  let httpClient: HttpClient;
  let appConfigService: AppConfigService;
  let alunoGetByIdService: AlunoGetByIdService;
  let alunoIncluirService: AlunoIncluirService;

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
    fixture = TestBed.createComponent(AlunoComponent);
    component = fixture.componentInstance;
    page = new AlunoPage(fixture);
    httpClient = TestBed.get(HttpClient);
    appConfigService = TestBed.get(AppConfigService);
    alunoGetByIdService = TestBed.get(AlunoGetByIdService);
  }));

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  fit('Todos componentes e funções devem estar criados', fakeAsync( () => {
    expect(component.formaIngressoList).toBeTruthy();
    expect(component.validForm).toBeTruthy();

    // expect(component.formaIngressoList)
    //   .toEqual([{ value: 'ENADE' }, { value: 'Vestibular' }]);

    //     this.formAluno = new FormGroup({
    //         nome: new FormControl('',  [Validators.required]),
    //         email: new FormControl('', [Validators.required, Validators.email]),
    //         cpf: new FormControl('', [Validators.required, cpfValidator()]),
    //         matricula: new FormControl('', [Validators.required]),
    //         formaIngresso: new FormControl('', [Validators.required])
    //     });
    // }
    //validForm

    //salvar()

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
