import { Enum } from './../../shared/enum/enum';

export type EnderecoSituacao =
  'NOVO_ENDERECO' |
  'ENDERECO_EXISTENTE';

export class EnderecoSituacaoEnum extends Enum<EnderecoSituacao> {

  static values = [
    EnderecoSituacaoEnum.NOVO_ENDERECO(),
    EnderecoSituacaoEnum.ENDERECO_EXISTENTE()
  ];

  static find(value: EnderecoSituacao): EnderecoSituacaoEnum {
    return EnderecoSituacaoEnum.values.find((x) => x.value === value);
  }

  private constructor(value: EnderecoSituacao, label: string, disabled?: boolean, public readonly tagClass?: string) {
    super(value, label, disabled);
  }

  static NOVO_ENDERECO(): Enum<EnderecoSituacao> {
    return new EnderecoSituacaoEnum('NOVO_ENDERECO', 'novoEndereco', false, 'po-color-01');
  }

  static ENDERECO_EXISTENTE() {
    return new EnderecoSituacaoEnum('ENDERECO_EXISTENTE', 'enderecoExistente', false, 'po-color-03');
  }
}
