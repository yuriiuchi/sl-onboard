import { Enum } from '../../shared/enum/enum';

export type ProcessoDocumento =
  | 'RECEBIMENTO'
  | 'EXPEDICAO'
  | 'RECEBIMENTO_EXPEDICAO';

export class ProcessoDocumentoEnum extends Enum<ProcessoDocumento> {
  static values = [
    ProcessoDocumentoEnum.RECEBIMENTO(),
    ProcessoDocumentoEnum.EXPEDICAO(),
    ProcessoDocumentoEnum.RECEBIMENTO_EXPEDICAO(),
  ];

  private constructor(
    value: ProcessoDocumento,
    label: string,
    disabled?: boolean
  ) {
    super(value, label, disabled);
  }

  static RECEBIMENTO() {
    return new ProcessoDocumentoEnum('RECEBIMENTO', 'recebimento');
  }

  static EXPEDICAO() {
    return new ProcessoDocumentoEnum('EXPEDICAO', 'expedicao');
  }

  static RECEBIMENTO_EXPEDICAO() {
    return new ProcessoDocumentoEnum('RECEBIMENTO_EXPEDICAO', 'recebimentoexpedicao');
  }
}
