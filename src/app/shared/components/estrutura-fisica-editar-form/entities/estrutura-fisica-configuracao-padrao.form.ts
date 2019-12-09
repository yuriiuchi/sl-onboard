import { FormValidatorsUtils } from '../../../forms/form-validators-utils';
import { EstruturaFisicaConfiguracaoColuna } from '../../../../entidades/estrutura-fisica-configuracao-coluna.entity';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EstruturaFisicaConfiguracao } from '../../../../entidades/estrutura-fisica-configuracao.entity';
import { SimNao } from '../../../../entidades/sim-nao.enum';
import { FormUtils } from 'totvs-log-base-foundation';

export class EstruturaFisicaConfiguracaoPadraoForm {

  public static readonly TAMANHO_MAXIMO_DESCRICAO = 20;
  public static readonly TAMANHO_MAXIMO_DESCRICAO_MOBILE = 4;

  protected formBuilder: FormBuilder;

  protected ultimaConfiguracaoPadrao: EstruturaFisicaConfiguracao;

  private _tipoConfiguracao: string;
  public get tipoConfiguracao(): string {
    return this._tipoConfiguracao;
  }

  protected _formGroup: FormGroup;
  public get formGroup(): FormGroup {
    return this._formGroup;
  }

  label: string;
  descricaoPadrao: string;
  descricaoMobilePadrao: string;

  get ativo(): boolean {
    return this.formGroup.get('ativo').value;
  }
  set ativo(valor: boolean) {
    this.formGroup.get('ativo').setValue(valor);
  }

  get controleNomenclatura(): AbstractControl {
    return this.formGroup.get('nomenclatura');
  }
  get descricao(): string {
    return this.controleNomenclatura.value;
  }
  set descricao(valor: string) {
    this.controleNomenclatura.setValue(valor);
  }

  get controleAbreviatura(): AbstractControl {
    return this.formGroup.get('abreviatura');
  }
  get descricaoMobile(): string {
    return this.controleAbreviatura.value;
  }
  set descricaoMobile(valor: string) {
    this.controleAbreviatura.setValue(valor);
  }

  get controleNomenclaturaPersonalizada(): AbstractControl {
    return this.formGroup.get('nomenclaturaPersonalizada');
  }
  get nomenclaturaPersonalizada(): SimNao {
    return this.controleNomenclaturaPersonalizada.value;
  }
  set nomenclaturaPersonalizada(valor: SimNao) {
    this.controleNomenclaturaPersonalizada.setValue(valor);
  }

  get controleAbreviaturaPersonalizada(): AbstractControl {
    return this.formGroup.get('abreviaturaPersonalizada');
  }
  get abreviaturaPersonalizada(): SimNao {
    return this.controleAbreviaturaPersonalizada.value;
  }
  set abreviaturaPersonalizada(valor: SimNao) {
    this.controleAbreviaturaPersonalizada.setValue(valor);
  }

  constructor(
    formBuilder: FormBuilder,
    tipoConfiguracao: string,
    ultimaConfiguracaoPadrao: EstruturaFisicaConfiguracao
  ) {
    this.formBuilder = formBuilder;
    this._tipoConfiguracao = tipoConfiguracao;
    this.ultimaConfiguracaoPadrao = ultimaConfiguracaoPadrao;
    this._formGroup = formBuilder.group({
      ativo: false,
      nomenclaturaPersonalizada: ['NAO', Validators.required],
      nomenclatura: ['',
        [
          Validators.required,
          Validators.maxLength(EstruturaFisicaConfiguracaoPadraoForm.TAMANHO_MAXIMO_DESCRICAO),
          FormValidatorsUtils.textoNaoVazio
        ]
      ],
      abreviaturaPersonalizada: ['NAO', Validators.required],
      abreviatura: ['',
        [
          Validators.required,
          Validators.maxLength(EstruturaFisicaConfiguracaoPadraoForm.TAMANHO_MAXIMO_DESCRICAO_MOBILE),
          FormValidatorsUtils.textoNaoVazio
        ]
      ]
    });

    this.formGroup.get('ativo').valueChanges
      .subscribe((valor: boolean) => {
        if (!valor) {
          this.limparValores();
        }
      });

    this.formGroup.get('nomenclaturaPersonalizada').valueChanges
      .subscribe((valor: SimNao) => {
        this.deveValidar((valor === 'SIM'), 'nomenclatura');
        if (valor === 'NAO') {
          this.descricao = '';
        }
      });

    this.formGroup.get('abreviaturaPersonalizada').valueChanges
      .subscribe((valor: SimNao) => {
        this.deveValidar((valor === 'SIM'), 'abreviatura');
        if (valor === 'NAO') {
          this.descricaoMobile = '';
        }
      });
  }

  public definirValoresIniciais() {
    this.ativo = this.ultimaConfiguracaoPadrao.ativo;
    this.label = this.ultimaConfiguracaoPadrao.label;
    this.descricaoPadrao = this.ultimaConfiguracaoPadrao.descricaoPadrao;
    this.descricao = this.ultimaConfiguracaoPadrao.descricao;
    this.descricaoMobilePadrao = this.ultimaConfiguracaoPadrao.descricaoMobilePadrao;
    this.descricaoMobile = this.ultimaConfiguracaoPadrao.descricaoMobile;
    this.nomenclaturaPersonalizada = this.getNomenclaturaPersonalizada();
    this.abreviaturaPersonalizada = this.getAbreviaturaPersonalizada();
  }

  protected limparValores() {
    this.abreviaturaPersonalizada = 'NAO';
    this.nomenclaturaPersonalizada = 'NAO';
    this.descricao = '';
    this.descricaoMobile = '';
  }

  protected deveValidar(deveInformar: boolean, ...nomeControle: string[]) {
    const formUtils = new FormUtils(this.formGroup);
    nomeControle.forEach(controle => {
      if (deveInformar) {
        this.formGroup.get(controle).enable();
      } else {
        this.formGroup.get(controle).disable();
      }
    });
    formUtils.executeFormValidation();
  }

  public mapTo(): EstruturaFisicaConfiguracao | EstruturaFisicaConfiguracaoColuna {
    return new EstruturaFisicaConfiguracao(this.tipoConfiguracao, {
      ativo: this.ativo,
      descricaoPadrao: this.descricaoPadrao,
      descricao: this.descricao,
      descricaoMobilePadrao: this.descricaoMobilePadrao,
      descricaoMobile: this.descricaoMobile
    });
  }

  private getNomenclaturaPersonalizada(): SimNao {
    return (this.descricao !== '' && this.descricao !== this.descricaoPadrao) ? 'SIM' : 'NAO';
  }

  private getAbreviaturaPersonalizada(): SimNao {
    return (this.descricaoMobile !== '' && this.descricaoMobile !== this.descricaoMobilePadrao) ? 'SIM' : 'NAO';
  }

  get descricaoApresentacao(): string {
    return (this.descricao && this.descricao.length > 0) ? this.descricao : this.descricaoPadrao;
  }

  get descricaoMobileApresentacao(): string {
    return (this.descricaoMobile && this.descricaoMobile.length > 0) ? this.descricaoMobile : this.descricaoMobilePadrao;
  }

  get descricaoCompletaApresentacao(): string {
    return `${this.descricaoApresentacao} (${this.descricaoMobileApresentacao})`;
  }

}
