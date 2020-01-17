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
    alunoIncluirService = TestBed.get(AlunoIncluirService);
  }));

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Todos componentes e funções devem estar criados', fakeAsync( () => {

    expect(component.validForm).toBeTruthy();
    expect(component.formaIngressoList).toBeTruthy();

    expect(component.formaIngressoList[0].value).toEqual('ENADE');
    expect(component.formaIngressoList[1].value).toEqual('Vestibular');
  }));

  it('Deve carregar a lista de alunos', fakeAsync(() => {
    const aluno =
      new Aluno('', 'aluno 01', 'email01@gmail.com', '02937451969', 'mat001', 'vestibular');

    const spySalvarService =
      spyOn(alunoIncluirService, 'Post')
        .and
        .returnValue(of('001'));

    component.formAluno.patchValue({ nome: aluno.nome});
    component.formAluno.patchValue({ email: aluno.email});
    component.formAluno.patchValue({ cpf: aluno.cpf});
    component.formAluno.patchValue({ matricula: aluno.matricula});
    component.formAluno.patchValue({ formaIngresso: aluno.formaIngresso});

    component.salvar();
    expect(component.alunoId).toEqual('001');
    expect(spySalvarService).toHaveBeenCalled();

    expect(component.validForm()).toBeTruthy();
  }));

  it('Deve invalidar o furmulario sem nome', fakeAsync(() => {
    const aluno =
      new Aluno('', '', 'email01@gmail.com', '02937451969', 'mat001', 'vestibular');

    component.formAluno.patchValue({ nome: aluno.nome});
    component.formAluno.patchValue({ email: aluno.email});
    component.formAluno.patchValue({ cpf: aluno.cpf});
    component.formAluno.patchValue({ matricula: aluno.matricula});
    component.formAluno.patchValue({ formaIngresso: aluno.formaIngresso});

    expect(component.validForm()).toBeFalsy();
  }));

  it('Deve invalidar o furmulario cpf errado', fakeAsync(() => {
    const aluno =
      new Aluno('', 'aluno 01', 'email01@gmail.com', '02937451970', 'mat001', 'vestibular');

    component.formAluno.patchValue({ nome: aluno.nome});
    component.formAluno.patchValue({ email: aluno.email});
    component.formAluno.patchValue({ cpf: aluno.cpf});
    component.formAluno.patchValue({ matricula: aluno.matricula});
    component.formAluno.patchValue({ formaIngresso: aluno.formaIngresso});

    expect(component.validForm()).toBeFalsy();
  }));

  it('Deve invalidar o furmulario email errado', fakeAsync(() => {
    const aluno =
      new Aluno('', 'aluno 01', 'email01gmail.com', '02937451970', 'mat001', 'vestibular');

    component.formAluno.patchValue({ nome: aluno.nome});
    component.formAluno.patchValue({ email: aluno.email});
    component.formAluno.patchValue({ cpf: aluno.cpf});
    component.formAluno.patchValue({ matricula: aluno.matricula});
    component.formAluno.patchValue({ formaIngresso: aluno.formaIngresso});

    expect(component.validForm()).toBeFalsy();
  }));

  it('Deve invalidar o furmulario sem matricula', fakeAsync(() => {
    const aluno =
      new Aluno('', 'aluno 01', 'email01@gmail.com', '02937451970', '', 'vestibular');

    component.formAluno.patchValue({ nome: aluno.nome});
    component.formAluno.patchValue({ email: aluno.email});
    component.formAluno.patchValue({ cpf: aluno.cpf});
    component.formAluno.patchValue({ matricula: aluno.matricula});
    component.formAluno.patchValue({ formaIngresso: aluno.formaIngresso});

    expect(component.validForm()).toBeFalsy();
  }));

  it('Deve invalidar o furmulario sem forma de ingresso', fakeAsync(() => {
    const aluno =
      new Aluno('', 'aluno 01', 'email01@gmail.com', '02937451970', 'mat001', '');

    component.formAluno.patchValue({ nome: aluno.nome});
    component.formAluno.patchValue({ email: aluno.email});
    component.formAluno.patchValue({ cpf: aluno.cpf});
    component.formAluno.patchValue({ matricula: aluno.matricula});
    component.formAluno.patchValue({ formaIngresso: aluno.formaIngresso});

    expect(component.validForm()).toBeFalsy();
  }));

  it('Deve validar o furmulario preenchido corretamente', fakeAsync(() => {
    const aluno =
      new Aluno('', 'aluno01', 'email01@gmail.com', '02937451969', 'mat001', 'vestibular');

    component.formAluno.patchValue({ nome: aluno.nome});
    component.formAluno.patchValue({ email: aluno.email});
    component.formAluno.patchValue({ cpf: aluno.cpf});
    component.formAluno.patchValue({ matricula: aluno.matricula});
    component.formAluno.patchValue({ formaIngresso: aluno.formaIngresso});

    expect(component.validForm()).toBeTruthy();
  }));

});
