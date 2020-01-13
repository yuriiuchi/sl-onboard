import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { configureTestSuite, click } from 'totvs-log-base-foundation';
import { RouterTestingModule } from '@angular/router/testing';
import { PoModule } from '@portinari/portinari-ui';
import { FndTestModule } from './../../../../mocks/fnd-test-module/fnd-test.module.mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AppConfigService } from './../../../../app-config.service';
import { AppConfigServiceMock } from './../../../../mocks/app-config.service.mock';


import { TurmaSimplesComponent } from './turma-simples.component';
import { TurmaGetByIdService } from './../../services/turma-get-by-id.service';
import { TurmaAlterarService } from './../../services/turma-alterar.service';
import { TurmaIncluirService } from './../../services/turma-incluir.service';

class TurmaIncluirPage {

    // get id() {
    //     return this.query('input[name=\'id\']');
    // }

    // get descricao() {
    //     return this.query('input[name=\'descricao\']');
    // }

    // get inicio() {
    //     return this.query('input[name=\'inicio\']');
    // }

    // get nrVagas() {
    //     return this.query('input[name=\'nrVagas\']');
    // }

    // get listDisciplinas() {
    //     return this.query('input[name=\'listDisciplinas\']');
    // }

    // get listAlunos() {
    //     return this.query('input[name=\'listAlunos\']');
    // }

  constructor(private fixture: ComponentFixture<TurmaSimplesComponent>) { }

//   clickSalvar() {
//     click(this.query('po-button[p-type=\'primary\']'));
//   }

  query(selector: string) {
    return this.fixture.nativeElement.querySelector(selector);
  }

//   queryAll(selector: string) {
//     const el = this.fixture.nativeElement.querySelectorAll(selector);
//     return el;
//   }
}

fdescribe('turma-simples.component.spec | TurmaSimplesComponent', () => {
  let component: TurmaSimplesComponent;
  let fixture: ComponentFixture<TurmaSimplesComponent>;
  let page: TurmaIncluirPage;
  let httpClient: HttpClient;
  let appConfigService: AppConfigService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'turmas', component: TurmaSimplesComponent }]),
        PoModule,
        FndTestModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        TurmaSimplesComponent
      ],
      providers: [
        TurmaIncluirService,
        TurmaAlterarService,
        TurmaGetByIdService,
        { provide: AppConfigService, useClass: AppConfigServiceMock },
        HttpClient,
      ]
    });
  });

  beforeEach(fakeAsync(async () => {
    fixture = TestBed.createComponent(TurmaSimplesComponent);
    component = fixture.componentInstance;
    page = new TurmaIncluirPage(fixture);
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

  it('Deve apresentar os campos para Turma', fakeAsync(() => {

    //component.getTurmaById()
    //validForm();
    // save();
    // alterar(id: string);
    // component.changeTipoCliente();
    // salvar()
    // getTurmaById()
    // formTurmaSimples: FormGroup;
    // public idTurma: string;
    // turma: Turma;
    fixture.detectChanges();
    flush();

    component.idTurma = '';
    //component.formTurmaSimples.setValue('');
    component.validForm();
    //page

    // expect(page.descricao).toBeTruthy();
    // expect(page.nrVagas).toBeTruthy();
    // expect(page.inicio).toBeTruthy();

  }));

//   it('Deve apresentar os campos para pessoa JURÍDICA e não apresentar os de pessoa FÍSICA', fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_JURIDICA';
//     component.changeTipoCliente();
//     fixture.detectChanges();
//     flush();

//     expect(page.cnpj).toBeTruthy();
//     expect(page.razaoSocial).toBeTruthy();
//     expect(page.inscricaoEstadual).toBeTruthy();
//     expect(page.estado).toBeTruthy();

//     expect(page.cpf).toBeFalsy();
//     expect(page.nome).toBeFalsy();
//   }));

//   it(`Deve considerar o formulário válido para pessoa FÍSICA com nome informado e CPF válido`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_FISICA';
//     component.changeTipoCliente();
//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       nome: 'Teste',
//       cpf: '61824850000',
//       inscricaoEstadual: null,
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeTruthy();

//   }));

//   it(`Deve considerar o formulário inválido para pessoa FÍSICA com NOME informado e CPF inválido`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_FISICA';

//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       nome: 'Teste',
//       cpf: '1522',
//       inscricaoEstadual: null,
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeFalsy();

//   }));

//   it(`Deve considerar o formulário válido para pessoa JURÍDICA com nome informado e CNPJ válido`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_JURIDICA';
//     component.changeTipoCliente();
//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       razaoSocial: 'Teste',
//       cnpj: '52805787000162',
//       inscricaoEstadual: null,
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeTruthy();

//   }));

//   it(`Deve considerar o formulário inválido para pessoa JURÍDICA com NOME informado e CNPJ inválido`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_JURIDICA';

//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       razaoSocial: 'Teste',
//       cnpj: '1522',
//       inscricaoEstadual: null,
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeFalsy();

//   }));

//   it(`Deve considerar o formulário como válido quando a inscrição estadual esta preenchida e o estado não é informado
//     para pessoa JURÍDICA`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_JURIDICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       razaoSocial: 'Teste',
//       cnpj: '96345067000137',
//       inscricaoEstadual: '0185284978316',
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeTruthy();

//   }));

//   it(`Deve considerar o formulário como válido quando a inscrição estadual esta preenchida e o estado não é informado
//     para pessoa FÍSICA`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_FISICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       nome: 'Teste',
//       cpf: '60920429084',
//       inscricaoEstadual: '0185284978316',
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeTruthy();

//   }));

//   it(`Deve considerar o formulário como inválido quando o ESTADO esta preenchido mas a INSCRIÇÃO ESTADUAL é incorreta
//     para pessoa JURÍDICA`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_JURIDICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       razaoSocial: 'Teste',
//       cnpj: '96345067000137',
//       inscricaoEstadual: '0185284978316',
//       estado: 'SC'
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeFalsy();

//   }));

//   it(`Deve considerar o formulário como inválido quando o ESTADO esta preenchido mas a INSCRIÇÃO ESTADUAL é incorrenta
//     para pessoa FÍSICA`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_FISICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       nome: 'Teste',
//       cpf: '60920429084',
//       inscricaoEstadual: '0185284978316',
//       estado: 'SC'
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeFalsy();

//   }));

//   it(`Deve considerar o formulário como inválido quando os campos OBRIGATÓRIOS não estão preenchidos para pessoa
//     JURÍDICA`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_JURIDICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       razaoSocial: null,
//       cnpj: null,
//       inscricaoEstadual: null,
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeFalsy();

//   }));

//   it(`Deve considerar o formulário como inválido quando os campos OBRIGATÓRIOS não estão preenchidos para pessoa
//     FÍSICA`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_FISICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       nome: null,
//       cpf: null,
//       inscricaoEstadual: null,
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeFalsy();

//   }));

//   it(`Deve considerar o formulário como válido quando apenas os campos OPCIONAIS não estiverem preenchidos para pessoa FÍSICA`,
//     fakeAsync(() => {

//       component.tipoCliente = 'PESSOA_FISICA';
//       component.changeTipoCliente();

//       fixture.detectChanges();
//       flush();

//       component.formCliente.setValue({
//         nome: 'Teste',
//         cpf: '61824850000',
//         inscricaoEstadual: null,
//         estado: null
//       });

//       fixture.detectChanges();
//       flush();

//       expect(component.formUtils.executeFormValidation()).toBeTruthy();

//     }));

//   it(`Deve considerar o formulário como válido quando apenas os campos OPCIONAIS não estiverem
//   preenchidos para pessoa JURÍDICA`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_JURIDICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       razaoSocial: 'Teste',
//       cnpj: '13354093000102',
//       inscricaoEstadual: null,
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeTruthy();

//   }));

//   it(`Deve considerar o formulário como inválido quando, depois de preenchido os campos para pessoa FÍSICA, trocar para pessoa
//   JURÍDICA e salvar sem alterar o CNPJ para CPF para pessoa JURÍDICA`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_FISICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       nome: 'Teste',
//       cpf: '61824850000',
//       inscricaoEstadual: null,
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     component.tipoCliente = 'PESSOA_JURIDICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeFalsy();

//   }));

//   it(`Deve considerar o formulário como inválido quando, depois de preenchido os campos para pessoa JURÍDICA, trocar para pessoa
//     FÍSICA e salvar sem alterar o CNPJ para CPF`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_JURIDICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       razaoSocial: 'Teste',
//       cnpj: '13354093000102',
//       inscricaoEstadual: null,
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     component.tipoCliente = 'PESSOA_FISICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeFalsy();

//   }));

//   it(`Deve considerar o formulário como válido quando, depois de preenchido os campos para pessoa JURÍDICA, trocar para pessoa
//     fisíca e salvar alterando o CNPJ para CPF`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_JURIDICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       razaoSocial: 'Teste',
//       cnpj: '15899292000113',
//       inscricaoEstadual: '779585623',
//       estado: 'SC'
//     });

//     fixture.detectChanges();
//     flush();

//     component.tipoCliente = 'PESSOA_FISICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     fixture.detectChanges();
//     flush();

//     tick(1000);

//     component.formCliente.setValue({
//       nome: 'Teste',
//       cpf: '61824850000',
//       inscricaoEstadual: '779585623',
//       estado: 'SC'
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeTruthy();

//   }));

//   it(`Deve considerar o formulário como válido quando, depois de preenchido os campos para pessoa FÍSICA, trocar para pessoa
//     JURÍDICA e salvar alterando o CNPJ para CPF`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_FISICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       nome: 'Teste',
//       cpf: '61824850000',
//       inscricaoEstadual: '779585623',
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     component.tipoCliente = 'PESSOA_JURIDICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       razaoSocial: 'Teste',
//       cnpj: '15899292000113',
//       inscricaoEstadual: '779585623',
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeTruthy();

//   }));


//   it(`Deve considerar o formulário como válido quando todos os campos estão preenchidos com valores válidos para pessoa
//     JURÍDICA`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_JURIDICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       razaoSocial: 'Teste',
//       cnpj: '13354093000102',
//       inscricaoEstadual: '779585623',
//       estado: 'SC'
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeTruthy();

//   }));

//   it(`Deve considerar o formulário como válido quando todos os campos estão preenchidos com valores válidos para pessoa
//     FÍSICA`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_FISICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       nome: 'Teste',
//       cpf: '61824850000',
//       inscricaoEstadual: '779585623',
//       estado: 'SC'
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeTruthy();

//   }));

//   it(`Deve considerar o formulário como inválido quando INSCRIÇÃO ESTADUAL contém 7 caracteres e o estado está NULO`, fakeAsync(() => {

//     component.tipoCliente = 'PESSOA_FISICA';
//     component.changeTipoCliente();

//     fixture.detectChanges();
//     flush();

//     component.formCliente.setValue({
//       nome: 'Teste',
//       cpf: '61824850000',
//       inscricaoEstadual: '0000000',
//       estado: null
//     });

//     fixture.detectChanges();
//     flush();

//     expect(component.formUtils.executeFormValidation()).toBeFalsy();

//   }));

//   it(`Deve retonar um cliente`, fakeAsync(() => {

//     component.editar = true;
//     component.idCliente = '1';

//     flush();

//     fixture.detectChanges();

//     flush();

//     expect(httpClient.get).toHaveBeenCalledWith(`${appConfigService.configuracoes.urlWMS.expedicaoQuery}/clientes/1`);

//   }));

});
