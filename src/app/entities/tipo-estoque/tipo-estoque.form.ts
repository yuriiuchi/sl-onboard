import { FormUtils } from 'totvs-log-base-foundation';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TipoEstoque } from './tipo-estoque.entity';

export class TipoEstoqueForm {

  get controleDescricao() {
    return this.formularioIncluirTipoEstoque.get('descricao');
  }

  formularioIncluirTipoEstoque: FormGroup;
  formUtils: FormUtils;

  constructor() { }

  criarFormulario = (tipoEstoque?: TipoEstoque) => {
    if (tipoEstoque) {
      this.formularioIncluirTipoEstoque = new FormGroup({
        descricao: new FormControl(tipoEstoque.descricao, Validators.required)
      });
    } else {
      this.formularioIncluirTipoEstoque = new FormGroup({
        descricao: new FormControl(null, Validators.required)
      });
    }
    this.formUtils = new FormUtils(this.formularioIncluirTipoEstoque);
    return this.formularioIncluirTipoEstoque;
  }

  public formularioEstaValido(): boolean {
    return this.formUtils.executeFormValidation();
  }

}
