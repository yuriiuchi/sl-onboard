import { configureTestSuite } from 'totvs-log-base-foundation';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EnderecoAndarForm } from './endereco-andar.form';

describe('endereco-andar.form.spec | EnderecoAndarForm', () => {

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
    expect(new EnderecoAndarForm(formBuilder)).toBeTruthy();
  });

  it('Deve validar de/até com DE tendo valor menor que ATÉ', () => {

    const form = new EnderecoAndarForm(formBuilder);

    form.formAndar.get('andarDe').setValue(10);
    form.formAndar.get('andarAte').setValue(50);

    form.formAndar.get('marcarAcessiveisAMao').setValue(true);

    form.formAndar.get('acessiveisAMao').setValue([true]);

    form.formAndar.get('marcarAcessiveisAMao').setValue(false);

    expect(form.andarDe).toBe(10);
    expect(form.andarAte).toBe(50);
    expect(form.acessiveisAMao).toEqual([]);
    expect(form.marcarAcessiveisAMao).toBe(false);
    expect(form.formAndar.valid).toBeTruthy();

  });

  it('Deve validar de/até com DE preenchido mas sem o valor ATÉ', () => {

    const form = new EnderecoAndarForm(formBuilder);

    form.formAndar.get('andarDe').setValue(10);
    form.formAndar.get('andarAte').setValue(null);

    expect(form.andarDe).toBe(10);
    expect(form.andarAte).toBe(null);
    expect(form.formAndar.valid).toBeFalsy();

  });

  it('Deve validar de/até com os campos DE e ATÉ e acessíveis a mão vazios', () => {

    const form = new EnderecoAndarForm(formBuilder);

    form.formAndar.get('andarDe').setValue(null);
    form.formAndar.get('andarAte').setValue(null);

    expect(form.formAndar.valid).toBeFalsy();

  });
});
