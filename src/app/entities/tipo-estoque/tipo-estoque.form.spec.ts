import { configureTestSuite } from 'totvs-log-base-foundation';
import { TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TipoEstoqueForm } from './tipo-estoque.form';
import { TipoEstoque } from './tipo-estoque.entity';

describe('tipo-estoque.form.spec | TipoEstoqueForm', () => {


  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    });
  });

  beforeEach(() => {
  });

  it('Deve criar o formulário', () => {
    expect(new TipoEstoqueForm()).toBeTruthy();
  });

  it('Deve validar como sucesso campos inseridos', () => {

    const form = new TipoEstoqueForm();

    const tipoEstoque: TipoEstoque = {
        id: '123456',
        unidadeId: '1',
        descricao: 'Tipoestoque 1'
    };

    form.criarFormulario(tipoEstoque);

    form.formularioIncluirTipoEstoque.get('descricao').setValue('Teste 1');

    expect(form.controleDescricao.value).toBe('Teste 1');
    expect(form.formularioEstaValido()).toBeTruthy();

  });

  it('Deve iniciar campos com sucesso', () => {

    const form = new TipoEstoqueForm();

    form.criarFormulario();

    expect(form.formularioIncluirTipoEstoque).toBeTruthy();

  });
});
