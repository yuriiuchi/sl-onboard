import { Enum } from 'src/app/shared/enum/enum';

export type SituacaoSelecaoEstoque =
  | 'COMPLETO'
  | 'EM_ANDAMENTO'
  | 'NAO_INICIADO';

export class SituacaoSelecaoEstoqueEnum extends Enum<SituacaoSelecaoEstoque> {

  static values = [
    SituacaoSelecaoEstoqueEnum.COMPLETO(),
    SituacaoSelecaoEstoqueEnum.EM_ANDAMENTO(),
    SituacaoSelecaoEstoqueEnum.NAO_INICIADO()
  ];

  private constructor(value: SituacaoSelecaoEstoque, label?: string,  public readonly tagClass?: string, disabled?: boolean) {
    super(value, label, disabled);
  }

  static find(value: SituacaoSelecaoEstoque): SituacaoSelecaoEstoqueEnum {
    return SituacaoSelecaoEstoqueEnum.values.find((x) => x.value === value);
  }

  static COMPLETO(): Enum<SituacaoSelecaoEstoque> {
    return new SituacaoSelecaoEstoqueEnum('COMPLETO', 'completo', 'po-color-11');
  }
  static EM_ANDAMENTO(): Enum<SituacaoSelecaoEstoque> {
    return new SituacaoSelecaoEstoqueEnum('EM_ANDAMENTO', 'emAndamento', 'po-color-08');
  }
  static NAO_INICIADO(): Enum<SituacaoSelecaoEstoque> {
    return new SituacaoSelecaoEstoqueEnum('NAO_INICIADO', 'naoIniciado', 'po-color-01');
  }
}
