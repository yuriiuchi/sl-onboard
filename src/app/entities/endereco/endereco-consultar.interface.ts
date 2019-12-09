import { IEnderecoDeposito } from './endereco-deposito.interface';
import { IEnderecoEstruturaFisica } from './endereco-estrutura-fisica.interface';
import { EnderecoFuncaoConsulta } from './endereco-funcao-consulta.enum';
import { EnderecoSituacaoAtual } from './endereco-situacao-atual.enum';

export interface IEnderecoConsultar {

  id: string;
  deposito: IEnderecoDeposito;
  situacaoAtual: EnderecoSituacaoAtual;
  codigoBarras: string;
  estruturaFisica: IEnderecoEstruturaFisica;
  funcao: EnderecoFuncaoConsulta;
  capacidadeUnitizador: string;
  unitizadorArmazenadoQuantidade: string;
  descricao: string;
  descricaoMobile: string;
  andarAcessivelMao: boolean;
  rotatividade: string;

}
