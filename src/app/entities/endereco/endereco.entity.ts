import { EnderecoCoordenadaColuna } from './endereco-coordenada-coluna.entity';
import { EnderecoCoordenadaAndar } from './endereco-coordenada-andar.entity';
import { EnderecoCoordenada } from './endereco-coordenada.entity';
import { EnderecoFuncao } from './endereco-funcao.enum';

export class Endereco {

  funcao?: EnderecoFuncao;
  descricao?: string;
  codigoBarras?: string;
  bloco?: EnderecoCoordenada;
  rua?: EnderecoCoordenada;
  coluna?: EnderecoCoordenadaColuna;
  andar?: EnderecoCoordenadaAndar;
  apartamento?: EnderecoCoordenada;

  public static vazio(): Endereco {
    return new Endereco();
  }

  public clone(): Endereco {
    const endereco = new Endereco();
    endereco.funcao = this.funcao;
    endereco.descricao = this.descricao;
    endereco.codigoBarras = this.codigoBarras;
    if (this.bloco) {
      endereco.bloco = this.bloco;
    }
    if (this.rua) {
      endereco.rua = this.rua;
    }
    if (this.coluna) {
      endereco.coluna = this.coluna;
    }
    if (this.andar) {
      endereco.andar = this.andar;
    }
    if (this.apartamento) {
      endereco.apartamento = this.apartamento;
    }
    return endereco;
  }
}
