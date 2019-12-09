import { configureTestSuite } from 'totvs-log-base-foundation';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EnderecoColunaForm } from './endereco-coluna.form';

describe('endereco-coluna.form.spec | EnderecoColunaForm', () => {

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
    expect(new EnderecoColunaForm(formBuilder)).toBeTruthy();
  });

  it('Deve preencher campos de/até', () => {

    const form = new EnderecoColunaForm(formBuilder);

    form.formColuna.get('colunaDe').setValue(1);
    form.formColuna.get('colunaAte').setValue(10);

    expect(form.colunaDe).toBe(1);
    expect(form.colunaAte).toBe(10);

  });

  it('Deve preencher campo de e até em branco', () => {

    const form = new EnderecoColunaForm(formBuilder);

    form.formColuna.get('colunaDe').setValue(1);
    form.formColuna.get('colunaAte').setValue(null);

    expect(form.colunaDe).toBe(1);
    expect(form.colunaAte).toBe(null);

  });

  it('Deve preencher campo de até e desmarcar lado da coluna', () => {

    const form = new EnderecoColunaForm(formBuilder);

    form.formColuna.get('colunaDe').setValue(1);
    form.formColuna.get('colunaAte').setValue(10);
    form.formColuna.get('ladoColuna').setValue([false, true]);

    expect(form.colunaDe).toBe(1);
    expect(form.colunaAte).toBe(10);
    expect(form.ladoColuna).toEqual([false, true]);
  });
});
