import { configureTestSuite } from 'totvs-log-base-foundation';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EnderecoRuaForm } from './endereco-rua.form';

describe('endereco-rua.form.spec | EnderecoRuaForm', () => {

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
    expect(new EnderecoRuaForm(formBuilder)).toBeTruthy();
  });

  it('Deve apresentar o campo de digitar o PREFIXO', () => {

    const form = new EnderecoRuaForm(formBuilder);

    expect(form.usaPrefixo).toBeFalsy();
    expect(form.formRua.get('temPrefixo').enabled).toBeFalsy();
    expect(form.formRua.get('ruaDeNumerico').enabled).toBeFalsy();
    expect(form.formRua.get('ruaAteNumerico').enabled).toBeFalsy();
    expect(form.formRua.get('ruaDeTexto').enabled).toBeTruthy();
    expect(form.formRua.get('ruaAteTexto').enabled).toBeTruthy();

    form.formRua.get('usaPrefixo').setValue(true);

    expect(form.usaPrefixo).toBeTruthy();
    expect(form.formRua.get('temPrefixo').enabled).toBeTruthy();
    expect(form.formRua.get('ruaDeNumerico').enabled).toBeTruthy();
    expect(form.formRua.get('ruaAteNumerico').enabled).toBeTruthy();
    expect(form.formRua.get('ruaDeTexto').enabled).toBeFalsy();
    expect(form.formRua.get('ruaAteTexto').enabled).toBeFalsy();
  });

  it('Deve validar de/até com DE tendo valor menor que ATÉ com prefixo', () => {

    const form = new EnderecoRuaForm(formBuilder);

    form.formRua.get('usaPrefixo').setValue(true);
    form.formRua.get('temPrefixo').setValue('T');
    form.formRua.get('ruaDeNumerico').setValue(10);
    form.formRua.get('ruaAteNumerico').setValue(50);

    expect(form.ruaDe).toBe(10);
    expect(form.ruaAte).toBe(50);
    expect(form.prefixo).toBe('T');
    expect(form.formRua.get('ruaDeTexto').enabled).toBeFalsy();
    expect(form.formRua.get('ruaAteTexto').enabled).toBeFalsy();
    expect(form.formRua.valid).toBeTruthy();

    form.formRua.get('usaPrefixo').setValue(false);
    form.formRua.get('ruaDeTexto').setValue('AA');
    form.formRua.get('ruaAteTexto').setValue('BB');

    expect(form.formRua.get('ruaDeNumerico').enabled).toBeFalsy();
    expect(form.formRua.get('ruaAteNumerico').enabled).toBeFalsy();
    expect(form.formRua.get('temPrefixo').enabled).toBeFalsy();
    expect(form.formRua.valid).toBeTruthy();
  });

  it('Deve validar de/até com DE sem prefixo preenchido', () => {

    const form = new EnderecoRuaForm(formBuilder);

    form.formRua.get('usaPrefixo').setValue(true);
    form.formRua.get('temPrefixo').setValue('');
    form.formRua.get('ruaDeNumerico').setValue(10);
    form.formRua.get('ruaAteNumerico').setValue(50);

    expect(form.formRua.get('ruaDeTexto').enabled).toBeFalsy();
    expect(form.formRua.get('ruaAteTexto').enabled).toBeFalsy();
    expect(form.formRua.valid).toBeFalsy();

  });

  it('Deve validar de/até com DE preenchido mas sem o valor ATÉ', () => {

    const form = new EnderecoRuaForm(formBuilder);

    form.formRua.get('ruaDeTexto').setValue('10');
    form.formRua.get('ruaAteTexto').setValue('');

    expect(form.ruaDe).toBe('10');
    expect(form.ruaAte).toBe('');
    expect(form.formRua.get('ruaDeNumerico').enabled).toBeFalsy();
    expect(form.formRua.get('ruaAteNumerico').enabled).toBeFalsy();
    expect(form.formRua.valid).toBeFalsy();
  });

  it('Deve validar de/até com os campos DE e ATÉ vazios', () => {

    const form = new EnderecoRuaForm(formBuilder);

    form.formRua.get('usaPrefixo').setValue(true);
    form.formRua.get('temPrefixo').setValue('TESTE');
    form.formRua.get('ruaDeNumerico').setValue(null);
    form.formRua.get('ruaAteNumerico').setValue(null);

    expect(form.formRua.get('ruaDeTexto').enabled).toBeFalsy();
    expect(form.formRua.get('ruaAteTexto').enabled).toBeFalsy();
    expect(form.formRua.valid).toBeFalsy();
  });
});
