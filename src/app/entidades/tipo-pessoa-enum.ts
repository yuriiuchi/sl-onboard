import { Enum } from './../shared/enum/enum';

export type TipoPessoa =
    | 'PESSOA_FISICA'
    | 'PESSOA_JURIDICA';

export class TipoPessoaEnum extends Enum<TipoPessoa> {
    static values = [
        TipoPessoaEnum.PESSOA_FISICA(),
        TipoPessoaEnum.PESSOA_JURIDICA()
    ];

    private constructor(value: TipoPessoa, label: string, disabled?: boolean) {
        super(value, label, disabled);
    }

    static PESSOA_FISICA(): Enum<TipoPessoa> {
        return new TipoPessoaEnum('PESSOA_FISICA', 'pessoaFisica');
    }

    static PESSOA_JURIDICA() {
        return new TipoPessoaEnum('PESSOA_JURIDICA', 'pessoaJuridica');
    }
}
