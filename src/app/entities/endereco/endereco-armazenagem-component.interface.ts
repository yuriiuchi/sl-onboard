import { EstruturaFisicaConfiguracao } from './../../entidades/estrutura-fisica-configuracao.entity';
import { EstruturaFisicaConfiguracaoColuna } from './../../entidades/estrutura-fisica-configuracao-coluna.entity';
import { EventEmitter } from '@angular/core';
import { DadosCoordenadaAndar } from './dados-coordenada-andar.entity';
import { DadosCoordenadaBlocoRua } from './dados-coordenada-bloco-rua.entity';
import { DadosCoordenadaColuna } from './dados-coordenada-coluna.entity';
import { DadosCoordenadaApartamento } from './dados-coordenada-apartamento.entity';

export interface IEnderecoArmazenagemComponent {

  configuracao: EstruturaFisicaConfiguracao | EstruturaFisicaConfiguracaoColuna;
  formAlterado: EventEmitter<DadosCoordenadaBlocoRua | DadosCoordenadaColuna | DadosCoordenadaAndar | DadosCoordenadaApartamento>;
  labelDivisor: string;
  labelFaixa: string;
  formularioValido(): boolean;
  getDadosFormulario(): DadosCoordenadaBlocoRua | DadosCoordenadaColuna | DadosCoordenadaAndar | DadosCoordenadaApartamento;
  marcarCamposInvalidos(): void;

}
