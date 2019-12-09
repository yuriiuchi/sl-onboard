import { EnderecoCoordenadaAndar } from './endereco-coordenada-andar.entity';
import { EnderecoCoordenadaColuna } from './endereco-coordenada-coluna.entity';
import { EnderecoCoordenada } from './endereco-coordenada.entity';

export class EnderecoArmazenagemCoordenadas {

  bloco?: EnderecoCoordenada[];
  rua?: EnderecoCoordenada[];
  coluna?: EnderecoCoordenadaColuna[];
  andar?: EnderecoCoordenadaAndar[];
  apartamento?: EnderecoCoordenada[];

  public static vazio() {
    return new EnderecoArmazenagemCoordenadas();
  }

  public getEnderecoCoordenadasOrdenado(): EnderecoArmazenagemCoordenadas {
    const objeto = EnderecoArmazenagemCoordenadas.vazio();
    if (this.hasOwnProperty('bloco')) {
      objeto.bloco = this.bloco;
    }
    if (this.hasOwnProperty('rua')) {
      objeto.rua = this.rua;
    }
    if (this.hasOwnProperty('coluna')) {
      objeto.coluna = this.coluna;
    }
    if (this.hasOwnProperty('andar')) {
      objeto.andar = this.andar;
    }
    if (this.hasOwnProperty('apartamento')) {
      objeto.apartamento = this.apartamento;
    }
    return objeto;
  }
}
