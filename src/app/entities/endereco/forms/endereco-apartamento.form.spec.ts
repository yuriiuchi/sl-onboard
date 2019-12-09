import { configureTestSuite } from 'totvs-log-base-foundation';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EnderecoApartamentoForm } from './endereco-apartamento.form';

describe('endereco-apartamento.form.spec | EnderecoApartamentoForm', () => {

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
    expect(new EnderecoApartamentoForm(formBuilder)).toBeTruthy();
  });

  it('Deve validar de/até com DE tendo valor menor que ATÉ', () => {

    const form = new EnderecoApartamentoForm(formBuilder);

    form.formApartamento.get('apartamentoDe').setValue(10);
    form.formApartamento.get('apartamentoAte').setValue(50);

    expect(form.apartamentoDe).toBe(10);
    expect(form.apartamentoAte).toBe(50);
    expect(form.formApartamento.valid).toBeTruthy();

  });

  it('Deve validar de/até com DE preenchido mas sem o valor ATÉ', () => {

    const form = new EnderecoApartamentoForm(formBuilder);

    form.formApartamento.get('apartamentoDe').setValue(10);
    form.formApartamento.get('apartamentoAte').setValue(null);

    expect(form.apartamentoDe).toBe(10);
    expect(form.apartamentoAte).toBe(null);
    expect(form.formApartamento.valid).toBeFalsy();

  });

  it('Deve validar de/até com os campos DE e ATÉ vazios', () => {

    const form = new EnderecoApartamentoForm(formBuilder);

    form.formApartamento.get('apartamentoDe').setValue(null);
    form.formApartamento.get('apartamentoAte').setValue(null);

    expect(form.formApartamento.valid).toBeFalsy();

  });
});
