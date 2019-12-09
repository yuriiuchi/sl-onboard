import { Enum } from '../shared/enum/enum';

export type ControleEstoque =
  | 'PRODUTO'
  | 'UNITIZADOR'
  | 'IDENTIFICADOR_ESTOQUE';

export class ControleEstoqueEnum extends Enum<ControleEstoque> {

  static values = [
    ControleEstoqueEnum.PRODUTO(),
    ControleEstoqueEnum.UNITIZADOR(),
    ControleEstoqueEnum.IDENTIFICADOR_ESTOQUE()
  ];

  private constructor(value: ControleEstoque, label: string, disabled?: boolean) {
    super(value, label, disabled);
  }

  static PRODUTO(): Enum<ControleEstoque> {
    return new ControleEstoqueEnum('PRODUTO', 'apenasProduto');
  }

  static UNITIZADOR(): Enum<ControleEstoque> {
    return new ControleEstoqueEnum('UNITIZADOR', 'unitizadorProduto');
  }

  static IDENTIFICADOR_ESTOQUE(): Enum<ControleEstoque> {
    return new ControleEstoqueEnum('IDENTIFICADOR_ESTOQUE', 'unitizadorIdentificacaoEstoque');
  }
}
