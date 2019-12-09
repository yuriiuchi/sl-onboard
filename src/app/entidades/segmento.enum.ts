import { Enum } from '../shared/enum/enum';

export type Segmento =
  'OPERADOR_LOGISTICO' |
  'RECINTO_ADUANEIRO' |
  'DISTRIBUIDOR' |
  'INDUSTRIA' |
  'VAREJO';

export class SegmentoEnum extends Enum<Segmento> {
  static values = [
    SegmentoEnum.OPERADOR_LOGISTICO(),
    SegmentoEnum.RECINTO_ADUANEIRO(),
    SegmentoEnum.DISTRIBUIDOR(),
    SegmentoEnum.INDUSTRIA(),
    SegmentoEnum.VAREJO()
  ];
  private constructor(value: Segmento, label: string, disabled = false) {
    super(value, label, disabled);
  }

  static OPERADOR_LOGISTICO(): Enum<Segmento> {
    return new SegmentoEnum('OPERADOR_LOGISTICO', 'operadorLogistico');
  }

  static RECINTO_ADUANEIRO(): Enum<Segmento> {
    return new SegmentoEnum('RECINTO_ADUANEIRO', 'operadorAduaneiro', true);
  }

  static DISTRIBUIDOR(): Enum<Segmento> {
    return new SegmentoEnum('DISTRIBUIDOR', 'distribuidor', false);
  }

  static INDUSTRIA(): Enum<Segmento> {
    return new SegmentoEnum('INDUSTRIA', 'industria', false);
  }

  static VAREJO(): Enum<Segmento> {
    return new SegmentoEnum('VAREJO', 'varejo', true);
  }
}
