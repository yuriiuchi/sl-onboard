import { Enum } from './../../shared/enum/enum';

export type EnderecoAlcance =
  'ACESSIVEL_A_MAO' |
  'NAO_ACESSIVEL_A_MAO';

export class EnderecoAlcanceEnum extends Enum<EnderecoAlcance> {

  static values = [
    EnderecoAlcanceEnum.ACESSIVEL_A_MAO(),
    EnderecoAlcanceEnum.NAO_ACESSIVEL_A_MAO()
  ];

  static find(value: EnderecoAlcance): EnderecoAlcanceEnum {
    return EnderecoAlcanceEnum.values.find((x) => x.value === value);
  }

  private constructor(value: EnderecoAlcance, label: string, disabled?: boolean, public readonly tagClass?: string) {
    super(value, label, disabled);
  }

  static ACESSIVEL_A_MAO(): Enum<EnderecoAlcance> {
    return new EnderecoAlcanceEnum('ACESSIVEL_A_MAO', 'acessivelAMao', false, 'po-color-11');
  }

  static NAO_ACESSIVEL_A_MAO() {
    return new EnderecoAlcanceEnum('NAO_ACESSIVEL_A_MAO', 'naoAcessivelAMao', false, 'po-color-08');
  }
}
