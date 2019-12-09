import { EstruturaFisicaConfiguracaoColuna } from './../../../entidades/estrutura-fisica-configuracao-coluna.entity';
import { FormUtils } from 'totvs-log-base-foundation';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DeAteFormValidator } from './../de-ate-form.validator';

export class EnderecoColunaForm {

  formColuna: FormGroup;
  utils: FormUtils;

  eventoFormularioAlterado: EventEmitter<void> = new EventEmitter();
  configuracao: EstruturaFisicaConfiguracaoColuna;

  get controleColunaDe(): AbstractControl {
    return this.formColuna.get('colunaDe');
  }

  get colunaDe(): number {
    return this.controleColunaDe.value;
  }

  get controleColunaAte(): AbstractControl {
    return this.formColuna.get('colunaAte');
  }

  get colunaAte(): number {
    return this.controleColunaAte.value;
  }

  get controleLadoColuna(): AbstractControl {
    return this.formColuna.get('ladoColuna');
  }

  get ladoColuna(): any {
    return this.controleLadoColuna.value || [];
  }

  constructor(private readonly formBuilder: FormBuilder) {
    this.formColuna = this.formBuilder.group({
      colunaDe: [null, Validators.required],
      colunaAte: [null, Validators.required],
      ladoColuna: [[], Validators.required]
    }, {
      validators: [
        DeAteFormValidator.deAteNumerico('colunaDe', 'colunaAte')
      ]
    }
    );

    this.formColuna.valueChanges.subscribe(() => {
      this.eventoFormularioAlterado.emit();
    });

    this.utils = new FormUtils(this.formColuna);
  }

  habilitarConfiguracaoLados(): boolean {
    if (this.configuracao && this.configuracao.configuracaoLados) {
      this.controleLadoColuna.enable();
      return true;
    } else {
      this.controleLadoColuna.disable();
      return false;
    }
  }
}
