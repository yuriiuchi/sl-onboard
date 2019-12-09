import { configureTestSuite } from 'totvs-log-base-foundation';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProdutosSkuAlterarForm } from './produto-sku-alterar-form';

describe('produto-incluir.form.spec | ProdutoIncluirForm', () => {

  let formBuilder: FormBuilder;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    });
  });

  beforeEach(() => {
    formBuilder = TestBed.get(FormBuilder);
  });

  it('Deve criar o formulário', () => {
    expect(new ProdutosSkuAlterarForm(formBuilder)).toBeTruthy();
  });

  it('Deve validar como sucesso campos inseridos com depositante', () => {

    const form = new ProdutosSkuAlterarForm(formBuilder);

    form.formularioAlterarSku.get('descricao').setValue('SKU 1');
    form.formularioAlterarSku.get('quantidadeUnidadesProduto').setValue('2');

    expect(form.valorDescricao).toBe('SKU 1');
    expect(form.valorQuantidadeUnidade).toBe('2');
    expect(form.formularioEstaValido()).toBeTruthy();

  });
});
