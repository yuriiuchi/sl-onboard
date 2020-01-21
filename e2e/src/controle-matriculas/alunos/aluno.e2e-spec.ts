import { browser, protractor } from 'protractor';
import { AlunoPage } from './aluno.po';
import { collectionName as collectionAluno } from './../alunos/aluno.mock';
import { CDTGlobal } from './../../extends';

declare const global: CDTGlobal;

describe('aluno.e2e-spec | Aluno', () => {

  let page: AlunoPage;

  beforeEach(async () => {

    page = new AlunoPage();

    await page.navigateTo();

  });

  fit('Preencher formulario valido de Aluno', async () => {
    await page.botaoNovoAluno.click();

    await page.preencherNovoAluno({
    nome: 'Aluno Teste e2e preencher',
    cpf: '50425669025',
    email: 'alunoTeste@gmail.com',
    matricula: 'Mat001',
    formaIngresso: 'Vestibular'
    });

    expect((await page.inputNome.getAttribute('class')).indexOf('ng-valid') > 1).toBeTruthy();
    expect((await page.inputCpf.getAttribute('class')).indexOf('ng-valid') > 1).toBeTruthy();
    expect((await page.inputEmail.getAttribute('class')).indexOf('ng-valid') > 1).toBeTruthy();
    expect((await page.inputFormaIngresso.getAttribute('class')).indexOf('ng-valid') > 1).toBeTruthy();
    expect((await page.inputMatricula.getAttribute('class')).indexOf('ng-valid') > 1).toBeTruthy();
  });

  it('Preencher formulario invalido de Aluno', async () => {
    await page.botaoNovoAluno.click();

    await page.preencherNovoAluno({
    nome: '',
    cpf: '50425669',
    email: 'alunoTeste@',
    matricula: '',
    formaIngresso: ''
    });

    expect((await page.inputNome.getAttribute('class')).indexOf('ng-invalid')).toBeGreaterThan(0);
    expect((await page.inputCpf.getAttribute('class')).indexOf('ng-invalid')).toBeGreaterThan(0);
    expect((await page.inputEmail.getAttribute('class')).indexOf('ng-invalid')).toBeGreaterThan(0);
    expect((await page.inputMatricula.getAttribute('class')).indexOf('ng-invalid')).toBeGreaterThan(0);
    expect((await page.inputFormaIngresso.getAttribute('class')).indexOf('ng-valid')).toBeGreaterThan(0);
  });

  it('Salvar aluno', async () => {
    await page.salvar();
    expect(page.alunoNovoCadastrado.getText()).toEqual('Aluno teste e2e salvar');
 });

});
