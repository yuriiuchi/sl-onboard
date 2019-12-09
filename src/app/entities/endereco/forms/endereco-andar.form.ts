import { EstruturaFisicaConfiguracao } from './../../../entidades/estrutura-fisica-configuracao.entity';
import { DadosCoordenadaAndar } from './../dados-coordenada-andar.entity';
import { EnderecoCoordenadaAndar } from './../endereco-coordenada-andar.entity';
import { FormUtils } from 'totvs-log-base-foundation';
import { EnderecoArmazenagem } from './../endereco-armazenagem.entity';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DeAteFormValidator } from './../de-ate-form.validator';
import { PoCheckboxGroupOption } from '@portinari/portinari-ui';

export class EnderecoAndarForm {

  formAndar: FormGroup;
  utils: FormUtils;

  eventoFormularioAlterado: EventEmitter<void> = new EventEmitter();

  get controleAndarDe(): AbstractControl {
    return this.formAndar.get('andarDe');
  }

  get andarDe(): number {
    return this.formAndar.get('andarDe').value;
  }

  get controleAndarAte(): AbstractControl {
    return this.formAndar.get('andarAte');
  }

  get andarAte(): number {
    return this.formAndar.get('andarAte').value;
  }

  get controleMarcarAcessiveisAMao(): AbstractControl {
    return this.formAndar.get('marcarAcessiveisAMao');
  }

  get marcarAcessiveisAMao(): boolean {
    return this.formAndar.get('marcarAcessiveisAMao').value;
  }

  get controleAcessiveisAMao(): AbstractControl {
    return this.formAndar.get('acessiveisAMao');
  }

  get acessiveisAMao(): string[] {
    return this.formAndar.get('acessiveisAMao').value;
  }
  set acessiveisAMao(valor: string[]) {
    this.formAndar.get('acessiveisAMao').setValue(valor);
  }

  public acessivelAMaoOpcoes: PoCheckboxGroupOption[] = [];
  public configuracao: EstruturaFisicaConfiguracao;

  private valorAndarDeAtual: number;
  private valorAndarAteAtual: number;
  private enderecoArmazenagem: EnderecoArmazenagem = new EnderecoArmazenagem();

  constructor(private readonly formBuilder: FormBuilder) {
    this.formAndar = this.formBuilder.group({
      andarDe: [null, Validators.required],
      andarAte: [null, Validators.required],
      marcarAcessiveisAMao: [false],
      acessiveisAMao: [[], Validators.required]
    }, { validators: DeAteFormValidator.deAteNumerico('andarDe', 'andarAte') });

    this.formAndar.valueChanges.subscribe(() => {
      this.eventoFormularioAlterado.emit();
    });

    this.desabilitarControlesQuandoMarcarAcessiveisAMao();

    this.controleMarcarAcessiveisAMao.valueChanges.subscribe((valor: boolean) => {
      if (valor) {
        this.habilitarControlesQuandoMarcarAcessiveisAMao();
      } else {
        this.desabilitarControlesQuandoMarcarAcessiveisAMao();
      }
      this.limparValoresQuandoMarcarAcessiveisAMao();
    });

    this.controleAndarDe.valueChanges.subscribe(() => {
      this.definirOpcoesAcessivelAMao();
    });

    this.controleAndarAte.valueChanges.subscribe(() => {
      this.definirOpcoesAcessivelAMao();
    });

    this.utils = new FormUtils(this.formAndar);
  }

  getDadosFormulario(): DadosCoordenadaAndar {
    return new DadosCoordenadaAndar(
      this.andarDe,
      this.andarAte,
      this.configuracao,
      (this.marcarAcessiveisAMao) ? this.acessiveisAMao : undefined
    );
  }

  private definirOpcoesAcessivelAMao() {

    if (
      this.valorAndarDeAtual !== this.andarDe ||
      this.valorAndarAteAtual !== this.andarAte
    ) {
      this.valorAndarDeAtual = this.andarDe;
      this.valorAndarAteAtual = this.andarAte;

      const coordenadasValor: EnderecoCoordenadaAndar[] = this.enderecoArmazenagem.calculaAndares(this.getDadosFormulario());

      this.acessivelAMaoOpcoes = [];
      this.acessiveisAMao = [];
      coordenadasValor.forEach(coordenadaValor => {
        this.acessivelAMaoOpcoes.push(
          {
            label: coordenadaValor.valor.toString(),
            value: coordenadaValor.valor.toString()
          }
        );
      });
    }
  }

  private habilitarControlesQuandoMarcarAcessiveisAMao() {
    this.controleAcessiveisAMao.enable();
  }

  private desabilitarControlesQuandoMarcarAcessiveisAMao() {
    this.controleAcessiveisAMao.disable();
  }

  private limparValoresQuandoMarcarAcessiveisAMao() {
    this.acessiveisAMao = [];
  }
}
