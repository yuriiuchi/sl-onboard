import { EnderecoSituacaoEnum } from './endereco-situacao.enum';
import { EnderecoAlcanceEnum } from './endereco-alcance.enum';

export interface IEnderecoVisualizacao {

  enderecoCompleto: string;
  enderecoAbreviado: string;
  situacao: EnderecoSituacaoEnum;
  alcance: EnderecoAlcanceEnum;

}
