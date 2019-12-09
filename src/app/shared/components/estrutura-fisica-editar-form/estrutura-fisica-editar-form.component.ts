import { BaseComponent } from './../../../base/base.component';
import { AppConfigService } from './../../../app-config.service';
import { EstruturaFisicaConfiguracaoColunaForm } from './entities/estrutura-fisica-configuracao-coluna.form';
import { EstruturaFisicaConfiguracaoPadraoForm } from './entities/estrutura-fisica-configuracao-padrao.form';
import { FormBuilder } from '@angular/forms';
import { ConfiguracaoLadoColunaEnum } from '../../../entidades/configuracao-lado-coluna.enum';
import { EstruturaFisica } from '../../../entidades/estrutura-fisica.entity';
import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'totvs-log-web-foundation';
import { PoSwitchLabelPosition, PoTagOrientation, PoTagType, PoRadioGroupOption } from '@portinari/portinari-ui';
import { EstruturaFisicaEditarForm } from './entities/estrutura-fisica-editar.form';
import { SimNaoEnum } from '../../../entidades/sim-nao.enum';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-estrutura-fisica-editar-form',
  templateUrl: './estrutura-fisica-editar-form.component.html',
  styleUrls: ['./estrutura-fisica-editar-form.component.css']
})
export class EstruturaFisicaEditarFormComponent extends BaseComponent implements OnInit {

  private _estruturaFisica: EstruturaFisica = undefined;

  @Input()
  set estruturaFisica(valor: EstruturaFisica) {
    this.form.limparConfiguracoes();
    this._estruturaFisica = valor;
    if (valor) {
      for (const tipoConfiguracao in this._estruturaFisica.configuracao) {
        if (tipoConfiguracao === 'coluna') {
          this.form.incluirConfiguracaoColuna(this._estruturaFisica.configuracao[tipoConfiguracao]);
        } else {
          this.form.incluirConfiguracaoPadrao(tipoConfiguracao, this._estruturaFisica.configuracao[tipoConfiguracao]);
        }
      }
    }
  }

  private _form: EstruturaFisicaEditarForm;
  public get form(): EstruturaFisicaEditarForm {
    return this._form;
  }

  opcoesDefinicaoLado: PoRadioGroupOption[];
  opcoesSimNao: PoRadioGroupOption[];

  get descricaoTipoEstrutura(): string {
    return (this._estruturaFisica) ? this._estruturaFisica.tipo.translateLabel(this.global) : '';
  }

  get posicaoLabelDireita(): PoSwitchLabelPosition {
    return PoSwitchLabelPosition.Right;
  }

  get orientacaoTipoVisualizacao(): PoTagOrientation {
    return PoTagOrientation.Horizontal;
  }

  get tipoTagVisualizacao(): PoTagType {
    return PoTagType.Success;
  }

  get tamanhoMaximoDescricao(): number {
    return EstruturaFisicaConfiguracaoPadraoForm.TAMANHO_MAXIMO_DESCRICAO;
  }

  get tamanhoMaximoDescricaoMobile(): number {
    return EstruturaFisicaConfiguracaoPadraoForm.TAMANHO_MAXIMO_DESCRICAO_MOBILE;
  }

  get tamanhoMaximoPrefixo(): number {
    return EstruturaFisicaConfiguracaoColunaForm.TAMANHO_MAXIMO_PREFIXO;
  }

  constructor(
    public global: GlobalService,
    private readonly configuracaoAplicativo: AppConfigService,
    formBuilder: FormBuilder
  ) {
    super();
    this._form = new EstruturaFisicaEditarForm(formBuilder);
  }

  public ngOnInit() {
    this.inicializar();
    this.configuracaoAplicativo.eventoIdiomaAlterado.pipe(
      takeUntil(this.destroy$)).subscribe(() => {
        this.inicializar();
      }
    );
  }

  public formularioEstaValido(): boolean {
    return this.form.estruturaFisicaFormGroup.valid && this.form.utils.executeFormValidation();
  }

  public getEstruturaFisicaAtualizada(): EstruturaFisica {
    if (this._estruturaFisica) {
      this._estruturaFisica.configuracao = this.form.mapTo();
      return this._estruturaFisica;
    } else {
      return undefined;
    }
  }

  private inicializar() {
    this.opcoesDefinicaoLado = ConfiguracaoLadoColunaEnum.values.map(valor => valor.toRadio(this.global));
    this.opcoesSimNao = SimNaoEnum.values.map(valor => valor.toRadio(this.global));
  }
}
