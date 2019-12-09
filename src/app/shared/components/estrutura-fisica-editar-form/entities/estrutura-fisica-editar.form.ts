import { FormValidatorsUtils } from './../../../forms/form-validators-utils';
import { EstruturaFisicaConfiguracoes } from '../../../../entidades/estrutura-fisica-configuracoes.entity';
import { FormUtils } from 'totvs-log-base-foundation';
import { EstruturaFisicaConfiguracaoColuna } from '../../../../entidades/estrutura-fisica-configuracao-coluna.entity';
import { EstruturaFisicaConfiguracao } from '../../../../entidades/estrutura-fisica-configuracao.entity';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { EstruturaFisicaConfiguracaoColunaForm } from './estrutura-fisica-configuracao-coluna.form';
import { EstruturaFisicaConfiguracaoPadraoForm } from './estrutura-fisica-configuracao-padrao.form';

export class EstruturaFisicaEditarForm {

  private formBuilder: FormBuilder;

  private _formUtils: FormUtils;
  public get utils(): FormUtils {
    return this._formUtils;
  }

  private _estruturaFisicaFormGroup: FormGroup;
  public get estruturaFisicaFormGroup(): FormGroup {
    return this._estruturaFisicaFormGroup;
  }

  private configuracoesFormArray: FormArray;

  private _configuracoes: Array<EstruturaFisicaConfiguracaoPadraoForm | EstruturaFisicaConfiguracaoColunaForm> = [];
  public get configuracoes(): Array<EstruturaFisicaConfiguracaoPadraoForm | EstruturaFisicaConfiguracaoColunaForm> {
    return this._configuracoes;
  }

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
    this.configuracoesFormArray = this.formBuilder.array([]);
    this._estruturaFisicaFormGroup = this.formBuilder.group({
      configuracoes: this.configuracoesFormArray
    }, {
      validators: [FormValidatorsUtils.aoMenosUmSwitchMarcado('configuracoes', 'ativo')]
    });
    this._formUtils = new FormUtils(this.estruturaFisicaFormGroup);
  }

  public limparConfiguracoes() {
    this.configuracoesFormArray.clear();
    this._configuracoes = [];
  }

  public incluirConfiguracaoPadrao(tipoConfiguracao: string, configuracao: EstruturaFisicaConfiguracao) {
    const configuracaoPadrao = new EstruturaFisicaConfiguracaoPadraoForm(this.formBuilder, tipoConfiguracao, configuracao);
    configuracaoPadrao.definirValoresIniciais();
    this.configuracoes.push(configuracaoPadrao);
    this.configuracoesFormArray.push(configuracaoPadrao.formGroup);
  }

  public incluirConfiguracaoColuna(configuracao: EstruturaFisicaConfiguracaoColuna) {
    const configuracaoColuna = new EstruturaFisicaConfiguracaoColunaForm(this.formBuilder, configuracao);
    configuracaoColuna.definirValoresIniciais();
    this.configuracoes.push(configuracaoColuna);
    this.configuracoesFormArray.push(configuracaoColuna.formGroup);
  }

  public mapTo(): EstruturaFisicaConfiguracoes {
    const configuracoes: EstruturaFisicaConfiguracoes = new EstruturaFisicaConfiguracoes(undefined);
    this.configuracoes.forEach(configuracao => {
      configuracoes[configuracao.tipoConfiguracao] = configuracao.mapTo();
    });
    return configuracoes;
  }
}
