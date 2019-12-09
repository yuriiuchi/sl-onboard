import { EnderecoCoordenadaAndar } from './endereco-coordenada-andar.entity';
import { EnderecoCoordenadaColuna } from './endereco-coordenada-coluna.entity';
import { EnderecoCoordenada } from './endereco-coordenada.entity';

export interface EnderecoPreVisualizacaoEvento {

  coordenadas: EnderecoCoordenada[] | EnderecoCoordenadaColuna[] | EnderecoCoordenadaAndar[];
  labelDivisor: string;
  descricaoCoordenada: string;

}
