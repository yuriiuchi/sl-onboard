import { Enum } from '../shared/enum/enum';

export type TipoNumeracaoColuna =
  | 'PAR'
  | 'IMPAR';

export class TipoNumeracaoColunaEnum extends Enum<TipoNumeracaoColuna> {
  static values = [
    TipoNumeracaoColunaEnum.PAR(),
    TipoNumeracaoColunaEnum.IMPAR()
  ];

  private constructor(value: TipoNumeracaoColuna, label: string, disabled?: boolean) {
    super(value, label, disabled);
  }

  static PAR(): Enum<TipoNumeracaoColuna> {
    return new TipoNumeracaoColunaEnum('PAR', 'par');
  }

  static IMPAR() {
    return new TipoNumeracaoColunaEnum('IMPAR', 'impar');
  }
}
