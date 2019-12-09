import { Enum } from '../../shared/enum/enum';

export type EnderecoAlcanceConsulta =
  'SIM' |
  'NAO' |
  'NAO_APLICAVEL';

export class EnderecoAlcanceConsultaEnum extends Enum<EnderecoAlcanceConsulta> {

  static values = [
    EnderecoAlcanceConsultaEnum.ACESSIVEL_A_MAO(),
    EnderecoAlcanceConsultaEnum.NAO_ACESSIVEL_A_MAO(),
    EnderecoAlcanceConsultaEnum.NAO_APLICAVEL()
  ];

  static find(value: EnderecoAlcanceConsulta): EnderecoAlcanceConsultaEnum {
    return EnderecoAlcanceConsultaEnum.values.find((x) => x.value === value);
  }

  private constructor(value: EnderecoAlcanceConsulta, label: string, public readonly tagClass?: string) {
    super(value, label);
  }

  static ACESSIVEL_A_MAO(): Enum<EnderecoAlcanceConsulta> {
    return new EnderecoAlcanceConsultaEnum('SIM', 'acessivelAMao', 'po-color-11');
  }

  static NAO_ACESSIVEL_A_MAO() {
    return new EnderecoAlcanceConsultaEnum('NAO', 'naoAcessivelAMao', 'po-color-08');
  }

  static NAO_APLICAVEL() {
    return new EnderecoAlcanceConsultaEnum('NAO_APLICAVEL', 'naoAplicavel', 'po-color-neutral');
  }
}
