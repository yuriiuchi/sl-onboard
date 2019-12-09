import { configureTestSuite } from 'totvs-log-base-foundation';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EnderecoBlocoForm } from './endereco-bloco.form';

describe('endereco-bloco.form.spec | EnderecoBlocoForm', () => {

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
    expect(new EnderecoBlocoForm(formBuilder)).toBeTruthy();
  });

  it('Deve apresentar o campo de digitar o PREFIXO', () => {

    const form = new EnderecoBlocoForm(formBuilder);

    expect(form.usaPrefixo).toBeFalsy();
    expect(form.formBloco.get('temPrefixo').enabled).toBeFalsy();
    expect(form.formBloco.get('blocoDeNumerico').enabled).toBeFalsy();
    expect(form.formBloco.get('blocoAteNumerico').enabled).toBeFalsy();
    expect(form.formBloco.get('blocoDeTexto').enabled).toBeTruthy();
    expect(form.formBloco.get('blocoAteTexto').enabled).toBeTruthy();

    form.formBloco.get('usaPrefixo').setValue(true);

    expect(form.usaPrefixo).toBeTruthy();
    expect(form.formBloco.get('temPrefixo').enabled).toBeTruthy();
    expect(form.formBloco.get('blocoDeNumerico').enabled).toBeTruthy();
    expect(form.formBloco.get('blocoAteNumerico').enabled).toBeTruthy();
    expect(form.formBloco.get('blocoDeTexto').enabled).toBeFalsy();
    expect(form.formBloco.get('blocoAteTexto').enabled).toBeFalsy();
  });

  it('Deve validar de/até com DE tendo valor menor que ATÉ com prefixo', () => {

    const form = new EnderecoBlocoForm(formBuilder);

    form.formBloco.get('usaPrefixo').setValue(true);
    form.formBloco.get('temPrefixo').setValue('T');
    form.formBloco.get('blocoDeNumerico').setValue(10);
    form.formBloco.get('blocoAteNumerico').setValue(50);

    expect(form.blocoDe).toBe(10);
    expect(form.blocoAte).toBe(50);
    expect(form.prefixo).toBe('T');
    expect(form.formBloco.get('blocoDeTexto').enabled).toBeFalsy();
    expect(form.formBloco.get('blocoAteTexto').enabled).toBeFalsy();
    expect(form.formBloco.valid).toBeTruthy();

    form.formBloco.get('usaPrefixo').setValue(false);
    form.formBloco.get('blocoDeTexto').setValue('AA');
    form.formBloco.get('blocoAteTexto').setValue('BB');

    expect(form.formBloco.get('blocoDeNumerico').enabled).toBeFalsy();
    expect(form.formBloco.get('blocoAteNumerico').enabled).toBeFalsy();
    expect(form.formBloco.get('temPrefixo').enabled).toBeFalsy();
    expect(form.formBloco.valid).toBeTruthy();
  });

  it('Deve validar de/até com DE sem prefixo preenchido', () => {

    const form = new EnderecoBlocoForm(formBuilder);

    form.formBloco.get('usaPrefixo').setValue(true);
    form.formBloco.get('temPrefixo').setValue('');
    form.formBloco.get('blocoDeNumerico').setValue(10);
    form.formBloco.get('blocoAteNumerico').setValue(50);

    expect(form.formBloco.get('blocoDeTexto').enabled).toBeFalsy();
    expect(form.formBloco.get('blocoAteTexto').enabled).toBeFalsy();
    expect(form.formBloco.valid).toBeFalsy();

  });

  it('Deve validar de/até com DE preenchido mas sem o valor ATÉ', () => {

    const form = new EnderecoBlocoForm(formBuilder);

    form.formBloco.get('blocoDeTexto').setValue('10');
    form.formBloco.get('blocoAteTexto').setValue('');

    expect(form.blocoDe).toBe('10');
    expect(form.blocoAte).toBe('');
    expect(form.formBloco.get('blocoDeNumerico').enabled).toBeFalsy();
    expect(form.formBloco.get('blocoAteNumerico').enabled).toBeFalsy();
    expect(form.formBloco.valid).toBeFalsy();
  });

  it('Deve validar de/até com os campos DE e ATÉ vazios', () => {

    const form = new EnderecoBlocoForm(formBuilder);

    form.formBloco.get('usaPrefixo').setValue(true);
    form.formBloco.get('temPrefixo').setValue('TESTE');
    form.formBloco.get('blocoDeNumerico').setValue(null);
    form.formBloco.get('blocoAteNumerico').setValue(null);

    expect(form.formBloco.get('blocoDeTexto').enabled).toBeFalsy();
    expect(form.formBloco.get('blocoAteTexto').enabled).toBeFalsy();
    expect(form.formBloco.valid).toBeFalsy();
  });
});
