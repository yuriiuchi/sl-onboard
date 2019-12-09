import { Enum } from 'src/app/shared/enum/enum';

export type SituacaoDocumentoProcesso =
    | 'VINCULADO'
    | 'NAO_VINCULADO';

export class SituacaoDocumentoProcessoEnum extends Enum<SituacaoDocumentoProcesso> {
    static values = [
        SituacaoDocumentoProcessoEnum.VINCULADO(),
        SituacaoDocumentoProcessoEnum.NAO_VINCULADO()
    ];

    static find(value: SituacaoDocumentoProcesso): SituacaoDocumentoProcessoEnum {
      return SituacaoDocumentoProcessoEnum.values.find((x) => x.value === value);
    }

    private constructor(value: SituacaoDocumentoProcesso, label: string, disabled?: boolean, public readonly tagClass?: string) {
        super(value, label, disabled);
    }

    static VINCULADO(): Enum<SituacaoDocumentoProcesso> {
        return new SituacaoDocumentoProcessoEnum('VINCULADO', 'vinculado', false, 'po-color-11');
    }

    static NAO_VINCULADO() {
        return new SituacaoDocumentoProcessoEnum('NAO_VINCULADO', 'naoVinculado', false, 'po-color-07');
    }

}
