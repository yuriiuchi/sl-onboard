import { Enum } from '../shared/enum/enum';

export type TipoEstruturaFisica =
  | 'PORTA_PALETE'
  | 'BLOCADO_ARMAZENAGEM'
  | 'BLOCADO_FUNCIONAL'
  | 'FLOWRACK'
  | 'ESTANTERIA'
  | 'GAVETEIRO'
  | 'DRIVE_IN'
  | 'DRIVE_THROUGH'
  | 'CANTILEVER'
  | 'PATIO';

export class TipoEstruturaFisicaEnum extends Enum<TipoEstruturaFisica> {

  static values = [
    TipoEstruturaFisicaEnum.PORTA_PALETE(),
    TipoEstruturaFisicaEnum.BLOCADO_ARMAZENAGEM(),
    TipoEstruturaFisicaEnum.BLOCADO_FUNCIONAL(),
    TipoEstruturaFisicaEnum.FLOWRACK(),
    TipoEstruturaFisicaEnum.ESTANTERIA(),
    TipoEstruturaFisicaEnum.GAVETEIRO(),
    TipoEstruturaFisicaEnum.DRIVE_IN(),
    TipoEstruturaFisicaEnum.DRIVE_THROUGH(),
    TipoEstruturaFisicaEnum.CANTILEVER(),
    TipoEstruturaFisicaEnum.PATIO()
  ];

  private constructor(
    value: TipoEstruturaFisica,
    label: string,
    disabled?: boolean
  ) {
    super(value, label, disabled);
  }

  static PORTA_PALETE(): TipoEstruturaFisicaEnum {
    return new TipoEstruturaFisicaEnum('PORTA_PALETE', 'portaPalete');
  }

  static BLOCADO_ARMAZENAGEM(): TipoEstruturaFisicaEnum {
    return new TipoEstruturaFisicaEnum('BLOCADO_ARMAZENAGEM', 'blocadoArmazenagem');
  }

  static BLOCADO_FUNCIONAL(): TipoEstruturaFisicaEnum {
    return new TipoEstruturaFisicaEnum('BLOCADO_FUNCIONAL', 'blocadoFuncional');
  }

  static FLOWRACK(): Enum<TipoEstruturaFisica> {
    return new TipoEstruturaFisicaEnum('FLOWRACK', 'flowrack');
  }

  static ESTANTERIA(): Enum<TipoEstruturaFisica> {
    return new TipoEstruturaFisicaEnum('ESTANTERIA', 'estanteria');
  }

  static GAVETEIRO(): Enum<TipoEstruturaFisica> {
    return new TipoEstruturaFisicaEnum('GAVETEIRO', 'gaveteiro');
  }

  static DRIVE_IN(): Enum<TipoEstruturaFisica> {
    return new TipoEstruturaFisicaEnum('DRIVE_IN', 'driveIn');
  }

  static DRIVE_THROUGH(): Enum<TipoEstruturaFisica> {
    return new TipoEstruturaFisicaEnum('DRIVE_THROUGH', 'driveThrough');
  }

  static CANTILEVER(): Enum<TipoEstruturaFisica> {
    return new TipoEstruturaFisicaEnum('CANTILEVER', 'cantilever');
  }

  static PATIO(): Enum<TipoEstruturaFisica> {
    return new TipoEstruturaFisicaEnum('PATIO', 'patio');
  }
}
