import { Cliente } from './cliente.entity';

export class ClienteAlterar {

  inscricaoEstadual: string;
  nome: string;
  unidadeFederativa: string;
  documentoIdentificacao: string;
  pessoaFisica: boolean;

  constructor(
    cliente: Cliente
  ) {
    this.inscricaoEstadual = cliente.inscricaoEstadual;
    this.nome = cliente.nome;
    this.unidadeFederativa = cliente.unidadeFederativa;
    this.documentoIdentificacao = cliente.documentoIdentificacao;
    this.pessoaFisica = cliente.pessoaFisica;
  }
}
