import { Enum } from './../../shared/enum/enum';

export type EnderecoFuncao =
  | 'ARMAZENAGEM'
  | 'DOCA'
  | 'STAGE';

export class EnderecoFuncaoEnum extends Enum<EnderecoFuncao> {
  static values = [
    EnderecoFuncaoEnum.DOCA(),
    EnderecoFuncaoEnum.STAGE()
  ];
  private constructor(value: EnderecoFuncao, label: string, disabled = false) {
    super(value, label, disabled);
  }

  static DOCA(): Enum<EnderecoFuncao> {
    return new EnderecoFuncaoEnum('DOCA', 'doca');
  }

  static STAGE(): Enum<EnderecoFuncao> {
    return new EnderecoFuncaoEnum('STAGE', 'stage');
  }
}
