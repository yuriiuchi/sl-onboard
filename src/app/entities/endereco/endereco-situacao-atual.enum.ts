import { Enum } from '../../shared/enum/enum';

export type EnderecoSituacaoAtual =
  'INATIVO' |
  'ATIVO' |
  'BLOQUEADO';

export class EnderecoSituacaoAtualEnum extends Enum<EnderecoSituacaoAtual> {

  static values = [
    EnderecoSituacaoAtualEnum.INATIVO(),
    EnderecoSituacaoAtualEnum.ATIVO(),
    EnderecoSituacaoAtualEnum.BLOQUEADO()
  ];

  static find(value: EnderecoSituacaoAtual): EnderecoSituacaoAtualEnum {
    return EnderecoSituacaoAtualEnum.values.find((x) => x.value === value);
  }

  private constructor(value: EnderecoSituacaoAtual, label: string, disabled?: boolean, public readonly tagClass?: string) {
    super(value, label, disabled);
  }

  static ATIVO(): Enum<EnderecoSituacaoAtual> {
    return new EnderecoSituacaoAtualEnum('ATIVO', 'ativo', false, 'po-color-01');
  }

  static INATIVO(): Enum<EnderecoSituacaoAtual> {
    return new EnderecoSituacaoAtualEnum('INATIVO', 'inativo', false, 'po-color-02');
  }


  static BLOQUEADO() {
    return new EnderecoSituacaoAtualEnum('BLOQUEADO', 'bloqueado', false, 'po-color-03');
  }
}
