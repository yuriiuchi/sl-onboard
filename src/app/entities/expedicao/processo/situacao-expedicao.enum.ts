import { Enum } from 'src/app/shared/enum/enum';

export type SituacaoExpedicao =
  | 'NAO_INICIADO'
  | 'EM_ANDAMENTO'
  | 'AGUARDANDO_BAIXA_ESTOQUE';

export class SituacaoExpedicaoEnum extends Enum<SituacaoExpedicao> {

  static values = [
    SituacaoExpedicaoEnum.NAO_INICIADO(),
    SituacaoExpedicaoEnum.AGUARDANDO_BAIXA_ESTOQUE(),
    SituacaoExpedicaoEnum.EM_ANDAMENTO()
  ];

  private constructor(value: SituacaoExpedicao, label?: string,  public readonly tagClass?: string, disabled?: boolean) {
    super(value, label, disabled);
  }

  static find(value: SituacaoExpedicao): SituacaoExpedicaoEnum {
    return SituacaoExpedicaoEnum.values.find((x) => x.value === value);
  }

  static NAO_INICIADO(): Enum<SituacaoExpedicao> {
    return new SituacaoExpedicaoEnum('NAO_INICIADO', 'naoIniciado', 'po-color-01');
  }
  static EM_ANDAMENTO(): Enum<SituacaoExpedicao> {
    return new SituacaoExpedicaoEnum('EM_ANDAMENTO', 'emAndamento', 'po-color-11');
  }
  static AGUARDANDO_BAIXA_ESTOQUE(): Enum<SituacaoExpedicao> {
    return new SituacaoExpedicaoEnum('AGUARDANDO_BAIXA_ESTOQUE', 'aguardandoBaixaEstoque', 'po-color-08');
  }
}
