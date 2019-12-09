import { maskBr } from '../../shared/formatUtils/mask';
import { UnidadeFederativa } from '../../entidades/unidade-federativa.enum';
import { ITransportadora } from './transportadora.interface';

export class Transportadora {

    get inscricaoEstadualFormatada(): string {
        if (this.unidadeFederativa && this.unidadeFederativa.trim() !== '') {
            return maskBr.inscricaoestadual(this.inscricaoEstadual, this.unidadeFederativa);
        } else {
            return this.inscricaoEstadual;
        }
    }

    get documentoIdentificacaoFormatado(): string {
        if (this.pessoaFisica) {
            return maskBr.cpf(this.documentoIdentificacao);
        } else {
            return maskBr.cnpj(this.documentoIdentificacao);
        }
    }

    constructor(
        public id: string,
        public inscricaoEstadual: string,
        public nome: string,
        public unidadeFederativa: string,
        public documentoIdentificacao: string,
        public pessoaFisica: boolean,
    ) {}

    get nomeUnidadeFederativa() {
       return UnidadeFederativa[this.unidadeFederativa];
    }

    get documento() {
        return this.documentoIdentificacao;
    }

    static fromDto(dto: ITransportadora) {
            return new Transportadora(
                dto.id,
                dto.inscricaoEstadual,
                dto.nome,
                dto.unidadeFederativa,
                dto.documentoIdentificacao,
                dto.pessoaFisica);
    }
}
