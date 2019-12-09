import { Enum } from '../shared/enum/enum';

export type SimNao =
  | 'SIM'
  | 'NAO';

export class SimNaoEnum extends Enum<SimNao> {

  static values = [
    SimNaoEnum.SIM(),
    SimNaoEnum.NAO()
  ];

  private constructor(value: SimNao, label: string, disabled?: boolean) {
    super(value, label, disabled);
  }

  static SIM(): Enum<SimNao> {
    return new SimNaoEnum('SIM', 'sim');
  }

  static NAO(): Enum<SimNao> {
    return new SimNaoEnum('NAO', 'nao');
  }
}
