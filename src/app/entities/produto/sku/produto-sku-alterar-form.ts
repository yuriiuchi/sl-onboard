import { FormUtils } from 'totvs-log-base-foundation';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorsUtils } from '../../../shared/forms/form-validators-utils';

export class ProdutosSkuAlterarForm {

  formularioAlterarSku: FormGroup;
  formUtils: FormUtils;

  eventoFormularioAlterado: EventEmitter<void> = new EventEmitter();

  get valorDescricao() {
    return this.formularioAlterarSku.get('descricao').value;
  }

  get valorQuantidadeUnidade() {
    return this.formularioAlterarSku.get('quantidadeUnidadesProduto').value;
  }

  constructor(private readonly formBuilder: FormBuilder) {
    this.formularioAlterarSku = this.formBuilder.group({
      descricao: ['', [Validators.required, FormValidatorsUtils.textoNaoVazio]],
      quantidadeUnidadesProduto: ['', [Validators.required]]
    });
    this.formUtils = new FormUtils(this.formularioAlterarSku);
  }

  public formularioEstaValido(): boolean {
    return this.formUtils.executeFormValidation();
  }
}
