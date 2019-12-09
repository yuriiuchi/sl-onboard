import { Enum } from '../shared/enum/enum';

export type ConfiguracaoLadoColuna =
  | 'LADO_ESQUERDO_IMPAR_DIREITO_PAR'
  | 'LADO_ESQUERDO_PAR_DIREITO_IMPAR'
  | 'LADO_UTILIZA_PREFIXO';

export class ConfiguracaoLadoColunaEnum extends Enum<ConfiguracaoLadoColuna> {

  static values = [
    ConfiguracaoLadoColunaEnum.LADO_ESQUERDO_IMPAR_DIREITO_PAR(),
    ConfiguracaoLadoColunaEnum.LADO_ESQUERDO_PAR_DIREITO_IMPAR(),
    ConfiguracaoLadoColunaEnum.LADO_UTILIZA_PREFIXO()
  ];

  private constructor(value: ConfiguracaoLadoColuna, label: string, disabled?: boolean) {
    super(value, label, disabled);
  }

  static LADO_ESQUERDO_IMPAR_DIREITO_PAR(): Enum<ConfiguracaoLadoColuna> {
    return new ConfiguracaoLadoColunaEnum('LADO_ESQUERDO_IMPAR_DIREITO_PAR', 'ladoEsquerdoImparDireitoPar');
  }

  static LADO_ESQUERDO_PAR_DIREITO_IMPAR(): Enum<ConfiguracaoLadoColuna> {
    return new ConfiguracaoLadoColunaEnum('LADO_ESQUERDO_PAR_DIREITO_IMPAR', 'ladoEsquerdoParDireitoImpar');
  }

  static LADO_UTILIZA_PREFIXO(): Enum<ConfiguracaoLadoColuna> {
    return new ConfiguracaoLadoColunaEnum('LADO_UTILIZA_PREFIXO', 'ladoUtilizaPrefixo');
  }
}
