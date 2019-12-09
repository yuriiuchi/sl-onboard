import { Enum } from '../../shared/enum/enum';

export type SituacaoSaldo =
  | 'RESERVA_GENERICA'
  | 'NAO_DISPONIVEL'
  | 'BUSCANDO_SALDO';

export class SituacaoSaldoEnum extends Enum<SituacaoSaldo> {
  static RESERVA_GENERICA = SituacaoSaldoEnum.RESERVA_GENERICA_CREATE();
  static NAO_DISPONIVEL = SituacaoSaldoEnum.NAO_DISPONIVEL_CREATE();
  static BUSCANDO_SALDO = SituacaoSaldoEnum.BUSCANDO_SALDO_CREATE();

  static values = [
    SituacaoSaldoEnum.RESERVA_GENERICA,
    SituacaoSaldoEnum.NAO_DISPONIVEL,
    SituacaoSaldoEnum.BUSCANDO_SALDO
  ];

  private constructor(
    value: SituacaoSaldo,
    label: string,
    public readonly tagClass: string
  ) {
    super(value, label);
  }

  static RESERVA_GENERICA_CREATE() {
    return new SituacaoSaldoEnum(
      'RESERVA_GENERICA',
      'reservaGenerica',
      'po-color-11'
    );
  }

  static NAO_DISPONIVEL_CREATE() {
    return new SituacaoSaldoEnum(
      'NAO_DISPONIVEL',
      'naoDisponivel',
      'po-color-07'
    );
  }

  static BUSCANDO_SALDO_CREATE() {
    return new SituacaoSaldoEnum(
      'BUSCANDO_SALDO',
      'buscandoSaldo',
      'po-color-01'
    );
  }
}
