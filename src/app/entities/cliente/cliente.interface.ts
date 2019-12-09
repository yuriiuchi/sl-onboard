export interface ICliente {
    id?: string;
    nome: string;
    documentoIdentificacao: string;
    inscricaoEstadual?: string;
    unidadeFederativa?: string;
    pessoaFisica: boolean;
}
