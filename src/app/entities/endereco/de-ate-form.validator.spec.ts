import { configureTestSuite } from 'totvs-log-base-foundation';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { DeAteFormValidator } from './de-ate-form.validator';

describe('de-ate-form-validator.spec | DeAteFormValidator', () => {

  let formBuilder: FormBuilder;
  let formPrefixo: FormGroup;
  let formNumerico: FormGroup;

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
    formNumerico = formBuilder.group({
      blocoDe: [null],
      blocoAte: [null],
    }, { validators: DeAteFormValidator.deAteNumerico('blocoDe', 'blocoAte') });
    formPrefixo = formBuilder.group({
      blocoDeTexto: [null],
      blocoAteTexto: [null],
      blocoDeNumerico: [null],
      blocoAteNumerico: [null],
      usaPrefixo: [false],
    }, { validators: DeAteFormValidator.deAteTextoPrefixo('blocoDe', 'blocoAte', 'usaPrefixo') });
  });

  it('Deve validar de/até com DE tendo valor menor que ATÉ (numérico)', () => {

    formNumerico.get('blocoDe').setValue(10);
    formNumerico.get('blocoAte').setValue(50);

    expect(formNumerico.valid).toBeTruthy();

    formNumerico.get('blocoDe').setValue(50);
    formNumerico.get('blocoAte').setValue(10);

    expect(formNumerico.valid).toBeFalsy();

  });

  it('Deve validar de/até com DE tendo valor maior que ATÉ sem prefixo', () => {

    formPrefixo.get('blocoDeTexto').setValue('AA');
    formPrefixo.get('blocoAteTexto').setValue('BB');

    expect(formPrefixo.valid).toBeTruthy();

    formPrefixo.get('blocoDeTexto').setValue('BB');
    formPrefixo.get('blocoAteTexto').setValue('AA');

    expect(formPrefixo.valid).toBeFalsy();

  });

  it('Deve validar de/até com DE tendo valor menor que ATÉ com prefixo', () => {

    formPrefixo.get('usaPrefixo').setValue(true);
    formPrefixo.get('blocoDeNumerico').setValue(10);
    formPrefixo.get('blocoAteNumerico').setValue(50);

    expect(formPrefixo.valid).toBeTruthy();

    formPrefixo.get('usaPrefixo').setValue(false);
    formPrefixo.get('blocoDeTexto').setValue('AA');
    formPrefixo.get('blocoAteTexto').setValue('BB');

    expect(formPrefixo.valid).toBeTruthy();

  });

  it('Deve validar de/até com DE preenchido mas sem o valor ATÉ', () => {

    formPrefixo.get('blocoDeTexto').setValue('10');
    formPrefixo.get('blocoAteTexto').setValue('');

    expect(formPrefixo.valid).toBeTruthy();

  });

  it('Deve validar de/até com os campos DE e ATÉ vazios', () => {

    formPrefixo.get('usaPrefixo').setValue(true);
    formPrefixo.get('blocoDeNumerico').setValue(null);
    formPrefixo.get('blocoAteNumerico').setValue(null);

    expect(formPrefixo.valid).toBeTruthy();

  });

  it('Deve validar de/até com os campos DE e ATÉ preenchidos inválidos', () => {

    formPrefixo.get('blocoDeTexto').setValue('AA');
    formPrefixo.get('blocoAteTexto').setValue('AAA');

    expect(formPrefixo.valid).toBeFalsy();

    formPrefixo.get('blocoDeTexto').setValue('1');
    formPrefixo.get('blocoAteTexto').setValue('10');

    expect(formPrefixo.valid).toBeTruthy();
  });
});
