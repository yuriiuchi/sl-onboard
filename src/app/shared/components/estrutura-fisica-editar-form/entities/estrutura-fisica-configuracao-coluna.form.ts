import { FormValidatorsUtils } from '../../../forms/form-validators-utils';
import { ConfiguracaoLados } from '../../../../entidades/configuracao-lados.entity';
import { EstruturaFisicaConfiguracaoColuna } from '../../../../entidades/estrutura-fisica-configuracao-coluna.entity';
import { FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { EstruturaFisicaConfiguracaoPadraoForm } from './estrutura-fisica-configuracao-padrao.form';
import { SimNao } from '../../../../entidades/sim-nao.enum';
import { TipoNumeracaoColunaEnum, TipoNumeracaoColuna } from '../../../../entidades/tipo-numeracao-coluna.enum';
import { ConfiguracaoLadoColuna } from '../../../../entidades/configuracao-lado-coluna.enum';
import { EstruturaFisicaConfiguracao } from '../../../../entidades/estrutura-fisica-configuracao.entity';

export class EstruturaFisicaConfiguracaoColunaForm extends EstruturaFisicaConfiguracaoPadraoForm {

  public static readonly TAMANHO_MAXIMO_PREFIXO = 3;

  private ultimaConfiguracaoColuna: EstruturaFisicaConfiguracaoColuna;

  get definirLado(): boolean {
    return this.formGroup.get('definirLado').value;
  }
  set definirLado(valor: boolean) {
    this.formGroup.get('definirLado').setValue(valor);
  }

  get controleOpcaoLado(): AbstractControl {
    return this.formGroup.get('opcaoLado');
  }
  get opcaoLado(): ConfiguracaoLadoColuna {
    return this.controleOpcaoLado.value;
  }
  set opcaoLado(valor: ConfiguracaoLadoColuna) {
    this.controleOpcaoLado.setValue(valor);
  }

  get utilizaPrefixo(): SimNao {
    return this.formGroup.get('utilizaPrefixo').value;
  }
  set utilizaPrefixo(valor: SimNao) {
    this.formGroup.get('utilizaPrefixo').setValue(valor);
  }

  get controlePrefixoEsquerdo(): AbstractControl {
    return this.formGroup.get('prefixoEsquerdo');
  }
  get prefixoEsquerdo(): string {
    return this.controlePrefixoEsquerdo.value;
  }
  set prefixoEsquerdo(valor: string) {
    this.controlePrefixoEsquerdo.setValue(valor);
  }

  get controlePrefixoDireito(): AbstractControl {
    return this.formGroup.get('prefixoDireito');
  }
  get prefixoDireito(): string {
    return this.controlePrefixoDireito.value;
  }
  set prefixoDireito(valor: string) {
    this.controlePrefixoDireito.setValue(valor);
  }

  constructor(
    formBuilder: FormBuilder,
    ultimaConfiguracaoColuna: EstruturaFisicaConfiguracaoColuna
  ) {
    super(formBuilder, 'coluna', ultimaConfiguracaoColuna);
    this.ultimaConfiguracaoColuna = ultimaConfiguracaoColuna;
    this.formGroup.addControl('definirLado', new FormControl(false));
    this.formGroup.addControl('opcaoLado', new FormControl('LADO_ESQUERDO_IMPAR_DIREITO_PAR', [Validators.required]));
    this.formGroup.addControl('utilizaPrefixo', new FormControl('NAO', [Validators.required]));
    this.formGroup.addControl('prefixoEsquerdo', new FormControl('', [
      Validators.required,
      Validators.maxLength(EstruturaFisicaConfiguracaoColunaForm.TAMANHO_MAXIMO_PREFIXO),
      FormValidatorsUtils.textoNaoVazio
    ]));
    this.formGroup.addControl('prefixoDireito', new FormControl('', [
      Validators.required,
      Validators.maxLength(EstruturaFisicaConfiguracaoColunaForm.TAMANHO_MAXIMO_PREFIXO),
      FormValidatorsUtils.textoNaoVazio
    ]));

    this.formGroup.get('definirLado').valueChanges
      .subscribe((valor: boolean) => {
        this.deveValidar(valor, 'opcaoLado');
        if (!valor) {
          this.opcaoLado = 'LADO_ESQUERDO_IMPAR_DIREITO_PAR';
          this.utilizaPrefixo = 'NAO';
          this.prefixoDireito = '';
          this.prefixoEsquerdo = '';
        }
      });

    this.formGroup.get('opcaoLado').valueChanges
      .subscribe((valor: ConfiguracaoLadoColuna) => {
        if (valor !== 'LADO_UTILIZA_PREFIXO') {
          this.utilizaPrefixo = 'NAO';
          this.prefixoDireito = '';
          this.prefixoEsquerdo = '';
        }
        this.deveValidar((valor === 'LADO_UTILIZA_PREFIXO'), 'utilizaPrefixo');
      });

    this.formGroup.get('utilizaPrefixo').valueChanges
      .subscribe((valor: SimNao) => {
        this.deveValidar((valor === 'SIM'), 'prefixoEsquerdo', 'prefixoDireito');
        if (valor === 'NAO') {
          this.prefixoDireito = '';
          this.prefixoEsquerdo = '';
        }
      });
  }

  public definirValoresIniciais() {
    super.definirValoresIniciais();
    this.definirLado = this.getLadoDefinido(this.ultimaConfiguracaoColuna.configuracaoLados);
    this.opcaoLado = this.getOpcaoLado(this.ultimaConfiguracaoColuna.configuracaoLados);
    this.utilizaPrefixo = this.getUtilizaPrefixo(this.ultimaConfiguracaoColuna.configuracaoLados);
    this.prefixoEsquerdo = this.getPrefixoEsquerdo(this.ultimaConfiguracaoColuna.configuracaoLados);
    this.prefixoDireito = this.getPrefixoDireito(this.ultimaConfiguracaoColuna.configuracaoLados);
  }

  public mapTo(): EstruturaFisicaConfiguracao | EstruturaFisicaConfiguracaoColuna {

    let ladoEsquerdo;
    let ladoDireito;

    if (this.definirLado) {

      let tipoNumeracaoColunaDireita: TipoNumeracaoColuna;
      let tipoNumeracaoColunaEsquerda: TipoNumeracaoColuna;
      let prefixoEsquerdo: string;
      let prefixoDireito: string;

      if (this.opcaoLado === 'LADO_ESQUERDO_IMPAR_DIREITO_PAR') {
        tipoNumeracaoColunaDireita = 'PAR';
        tipoNumeracaoColunaEsquerda = 'IMPAR';
      } else if (this.opcaoLado === 'LADO_ESQUERDO_PAR_DIREITO_IMPAR') {
        tipoNumeracaoColunaDireita = 'IMPAR';
        tipoNumeracaoColunaEsquerda = 'PAR';
      } else {
        if (this.utilizaPrefixo === 'SIM') {
          prefixoEsquerdo = this.prefixoEsquerdo;
          prefixoDireito = this.prefixoDireito;
        } else {
          prefixoEsquerdo = 'E';
          prefixoDireito = 'D';
        }
      }

      ladoEsquerdo = {
        prefixo: prefixoEsquerdo,
        tipoNumeracaoColuna: tipoNumeracaoColunaEsquerda
      };
      ladoDireito = {
        prefixo: prefixoDireito,
        tipoNumeracaoColuna: tipoNumeracaoColunaDireita
      };
    }

    return new EstruturaFisicaConfiguracaoColuna('coluna', {
      ativo: this.ativo,
      descricaoPadrao: this.descricaoPadrao,
      descricao: this.descricao,
      descricaoMobilePadrao: this.descricaoMobilePadrao,
      descricaoMobile: this.descricaoMobile,
      ladoEsquerdo,
      ladoDireito
    });
  }

  protected limparValores() {
    super.limparValores();
    this.definirLado = false;
    this.opcaoLado = 'LADO_ESQUERDO_IMPAR_DIREITO_PAR';
    this.utilizaPrefixo = 'NAO';
    this.prefixoDireito = '';
    this.prefixoEsquerdo = '';
  }

  private getLadoDefinido(configuracaoLados: ConfiguracaoLados): boolean {
    return (configuracaoLados && configuracaoLados !== null) || false;
  }

  private getOpcaoLado(configuracaoLados: ConfiguracaoLados): ConfiguracaoLadoColuna {
    if (!configuracaoLados) {
      return undefined;
    } else if (configuracaoLados.ladoDireito && configuracaoLados.ladoDireito.prefixo) {
      return 'LADO_UTILIZA_PREFIXO';
    } else if (
      configuracaoLados.ladoDireito &&
      configuracaoLados.ladoDireito.tipoNumeracaoColuna &&
      configuracaoLados.ladoDireito.tipoNumeracaoColuna.value === TipoNumeracaoColunaEnum.PAR().value) {
      return 'LADO_ESQUERDO_IMPAR_DIREITO_PAR';
    } else {
      return 'LADO_ESQUERDO_PAR_DIREITO_IMPAR';
    }
  }

  private getUtilizaPrefixo(configuracaoLados: ConfiguracaoLados): SimNao {
    return ( configuracaoLados &&
      (
        configuracaoLados.ladoDireito &&
        configuracaoLados.ladoDireito.prefixo !== ''
        && configuracaoLados.ladoDireito.prefixo !== 'D'
      ) &&
      (
        configuracaoLados.ladoEsquerdo &&
        configuracaoLados.ladoEsquerdo.prefixo !== '' &&
        configuracaoLados.ladoEsquerdo.prefixo !== 'E')
    ) ? 'SIM' : 'NAO';
  }

  private getPrefixoDireito(configuracaoLados: ConfiguracaoLados): string {
    return (configuracaoLados && configuracaoLados.ladoDireito) ? configuracaoLados.ladoDireito.prefixo : '';
  }

  private getPrefixoEsquerdo(configuracaoLados: ConfiguracaoLados): string {
    return (configuracaoLados && configuracaoLados.ladoEsquerdo) ? configuracaoLados.ladoEsquerdo.prefixo : '';
  }
}
