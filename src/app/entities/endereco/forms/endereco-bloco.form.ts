import { FormUtils } from 'totvs-log-base-foundation';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DeAteFormValidator } from './../de-ate-form.validator';

export class EnderecoBlocoForm {

  formBloco: FormGroup;
  utils: FormUtils;

  eventoFormularioAlterado: EventEmitter<void> = new EventEmitter();

  get controleBlocoDe(): AbstractControl {
    return this.formBloco.get((this.usaPrefixo) ? 'blocoDeNumerico' : 'blocoDeTexto');
  }

  get blocoDe(): string | number {
    return this.controleBlocoDe.value;
  }

  get controleBlocoAte(): AbstractControl {
    return this.formBloco.get((this.usaPrefixo) ? 'blocoAteNumerico' : 'blocoAteTexto');
  }

  get blocoAte(): string | number {
    return this.controleBlocoAte.value;
  }

  get controlePrefixo(): AbstractControl {
    return this.formBloco.get('temPrefixo');
  }

  get prefixo(): string {
    return (this.usaPrefixo) ? this.controlePrefixo.value : '';
  }

  get usaPrefixo(): boolean {
    return this.formBloco.get('usaPrefixo').value || false;
  }

  constructor(private readonly formBuilder: FormBuilder) {
    this.formBloco = this.formBuilder.group({
      blocoDeTexto: [null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$|^[0-9]*$')
      ]],
      blocoAteTexto: [null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$|^[0-9]*$')
      ]],
      blocoDeNumerico: [null, Validators.required],
      blocoAteNumerico: [null, Validators.required],
      usaPrefixo: [false],
      temPrefixo: [null, Validators.required]
    }, { validators: DeAteFormValidator.deAteTextoPrefixo('blocoDe', 'blocoAte', 'usaPrefixo') });

    this.desabilitarControlesQuandoUsaPrefixo();

    this.formBloco.get('usaPrefixo').valueChanges.subscribe((valor: boolean) => {
      if (valor) {
        this.habilitarControlesQuandoUsaPrefixo();
        this.limparValoresQuandoUsaPrefixo();
      } else {
        this.desabilitarControlesQuandoUsaPrefixo();
        this.limparValoresQuandoNaoUsaPrefixo();
      }
    });

    this.formBloco.valueChanges.subscribe(() => {
      this.eventoFormularioAlterado.emit();
    });

    this.utils = new FormUtils(this.formBloco);
  }

  private habilitarControlesQuandoUsaPrefixo() {
    this.formBloco.get('temPrefixo').enable();
    this.formBloco.get('blocoDeNumerico').enable();
    this.formBloco.get('blocoAteNumerico').enable();
    this.formBloco.get('blocoDeTexto').disable();
    this.formBloco.get('blocoAteTexto').disable();
  }

  private desabilitarControlesQuandoUsaPrefixo() {
    this.formBloco.get('temPrefixo').disable();
    this.formBloco.get('blocoDeNumerico').disable();
    this.formBloco.get('blocoAteNumerico').disable();
    this.formBloco.get('blocoDeTexto').enable();
    this.formBloco.get('blocoAteTexto').enable();
  }

  private limparValoresQuandoUsaPrefixo() {
    this.formBloco.get('blocoDeTexto').setValue('');
    this.formBloco.get('blocoAteTexto').setValue('');
  }

  private limparValoresQuandoNaoUsaPrefixo() {
    this.formBloco.get('temPrefixo').setValue('');
    this.formBloco.get('blocoDeNumerico').setValue(null);
    this.formBloco.get('blocoAteNumerico').setValue(null);
  }
}
