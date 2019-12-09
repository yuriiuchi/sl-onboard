import { Enum } from './../shared/enum/enum';

export type ControleWms = 'WMS' | 'WES';
export class ControleWmsEnum extends Enum<ControleWms> {
  static values: Enum<ControleWms>[] = [
    ControleWmsEnum.WES(),
    ControleWmsEnum.WMS(),
  ];
  private constructor(value: ControleWms, label: string) {
    super(value, label);
  }
  static WMS(): Enum<ControleWms> {
    return new ControleWmsEnum('WMS', 'controlaWms');
  }
  static WES(): Enum<ControleWms> {
    return new ControleWmsEnum('WES', 'controlaWes');
  }
}
