import { Transportadora } from './transportadora.entity';

export class TransportadoraAlterar {

  inscricaoEstadual: string;
  nome: string;
  unidadeFederativa: string;
  documentoIdentificacao: string;
  pessoaFisica: boolean;

  constructor(
    transportadora: Transportadora
  ) {
    this.inscricaoEstadual = transportadora.inscricaoEstadual;
    this.nome = transportadora.nome;
    this.unidadeFederativa = transportadora.unidadeFederativa;
    this.documentoIdentificacao = transportadora.documentoIdentificacao;
    this.pessoaFisica = transportadora.pessoaFisica;
  }
}
