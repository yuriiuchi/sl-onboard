import { FormUtils } from 'totvs-log-base-foundation';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DeAteFormValidator } from './../de-ate-form.validator';

export class EnderecoApartamentoForm {

  formApartamento: FormGroup;
  utils: FormUtils;

  eventoFormularioAlterado: EventEmitter<void> = new EventEmitter();

  get controleApartamentoDe(): AbstractControl {
    return this.formApartamento.get('apartamentoDe');
  }

  get apartamentoDe(): number {
    return this.controleApartamentoDe.value;
  }

  get controleApartamentoAte(): AbstractControl {
    return this.formApartamento.get('apartamentoAte');
  }

  get apartamentoAte(): number {
    return this.controleApartamentoAte.value;
  }

  constructor(private readonly formBuilder: FormBuilder) {
    this.formApartamento = this.formBuilder.group({
      apartamentoDe: [null, Validators.required],
      apartamentoAte: [null, Validators.required]
    }, { validators: DeAteFormValidator.deAteNumerico('apartamentoDe', 'apartamentoAte') });

    this.formApartamento.valueChanges.subscribe(() => {
      this.eventoFormularioAlterado.emit();
    });

    this.utils = new FormUtils(this.formApartamento);
  }
}
