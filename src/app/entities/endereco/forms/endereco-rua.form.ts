import { FormUtils } from 'totvs-log-base-foundation';
import { DeAteFormValidator } from './../de-ate-form.validator';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

export class EnderecoRuaForm {

  formRua: FormGroup;
  utils: FormUtils;

  eventoFormularioAlterado: EventEmitter<void> = new EventEmitter();

  get controleRuaDe(): AbstractControl {
    return this.formRua.get((this.usaPrefixo) ? 'ruaDeNumerico' : 'ruaDeTexto');
  }

  get ruaDe(): string | number {
    return this.controleRuaDe.value;
  }

  get controleRuaAte(): AbstractControl {
    return this.formRua.get((this.usaPrefixo) ? 'ruaAteNumerico' : 'ruaAteTexto');
  }

  get ruaAte(): string | number {
    return this.controleRuaAte.value;
  }

  get controlePrefixo(): AbstractControl {
    return this.formRua.get('temPrefixo');
  }

  get prefixo(): string {
    return (this.usaPrefixo) ? this.controlePrefixo.value : '';
  }

  get usaPrefixo(): boolean {
    return this.formRua.get('usaPrefixo').value || false;
  }

  constructor(private readonly formBuilder: FormBuilder) {
    this.formRua = this.formBuilder.group({
      ruaDeTexto: [null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$|^[0-9]*$')
      ]],
      ruaAteTexto: [null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$|^[0-9]*$')
      ]],
      ruaDeNumerico: [null, Validators.required],
      ruaAteNumerico: [null, Validators.required],
      usaPrefixo: [false],
      temPrefixo: [null, Validators.required]
    }, { validators: DeAteFormValidator.deAteTextoPrefixo('ruaDe', 'ruaAte', 'usaPrefixo') });

    this.desabilitarControlesQuandoUsaPrefixo();

    this.formRua.get('usaPrefixo').valueChanges.subscribe((valor: boolean) => {
      if (valor) {
        this.habilitarControlesQuandoUsaPrefixo();
        this.limparValoresQuandoUsaPrefixo();
      } else {
        this.desabilitarControlesQuandoUsaPrefixo();
        this.limparValoresQuandoNaoUsaPrefixo();
      }
    });

    this.formRua.valueChanges.subscribe(() => {
      this.eventoFormularioAlterado.emit();
    });

    this.utils = new FormUtils(this.formRua);
  }

  private habilitarControlesQuandoUsaPrefixo() {
    this.formRua.get('temPrefixo').enable();
    this.formRua.get('ruaDeNumerico').enable();
    this.formRua.get('ruaAteNumerico').enable();
    this.formRua.get('ruaDeTexto').disable();
    this.formRua.get('ruaAteTexto').disable();
  }

  private desabilitarControlesQuandoUsaPrefixo() {
    this.formRua.get('temPrefixo').disable();
    this.formRua.get('ruaDeNumerico').disable();
    this.formRua.get('ruaAteNumerico').disable();
    this.formRua.get('ruaDeTexto').enable();
    this.formRua.get('ruaAteTexto').enable();
  }

  private limparValoresQuandoUsaPrefixo() {
    this.formRua.get('ruaDeTexto').setValue('');
    this.formRua.get('ruaAteTexto').setValue('');
  }

  private limparValoresQuandoNaoUsaPrefixo() {
    this.formRua.get('temPrefixo').setValue('');
    this.formRua.get('ruaDeNumerico').setValue(null);
    this.formRua.get('ruaAteNumerico').setValue(null);
  }
}
