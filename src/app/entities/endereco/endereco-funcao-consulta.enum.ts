import { Enum } from '../../shared/enum/enum';

export type EnderecoFuncaoConsulta =
  | 'ARMAZENAGEM'
  | 'DOCA'
  | 'STAGE';

export class EnderecoFuncaoConsultaEnum extends Enum<EnderecoFuncaoConsulta> {
  static values = [
    EnderecoFuncaoConsultaEnum.DOCA(),
    EnderecoFuncaoConsultaEnum.STAGE(),
    EnderecoFuncaoConsultaEnum.ARMAZENAGEM()
  ];
  private constructor(value: EnderecoFuncaoConsulta, label: string) {
    super(value, label);
  }

  static DOCA(): Enum<EnderecoFuncaoConsulta> {
    return new EnderecoFuncaoConsultaEnum('DOCA', 'doca');
  }

  static STAGE(): Enum<EnderecoFuncaoConsulta> {
    return new EnderecoFuncaoConsultaEnum('STAGE', 'stage');
  }

  static ARMAZENAGEM(): Enum<EnderecoFuncaoConsulta> {
    return new EnderecoFuncaoConsultaEnum('ARMAZENAGEM', 'armazenagem');
  }
}
