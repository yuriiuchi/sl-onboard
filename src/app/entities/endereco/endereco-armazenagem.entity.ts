import { Endereco } from './endereco.entity';
import { EnderecoArmazenagemCoordenadas } from './endereco-armazenagem-coordenadas.entity';
import { DadosCoordenada } from './dados-coordenada.entity';
import { EnderecoCoordenadaAndar } from './endereco-coordenada-andar.entity';
import { EnderecoCoordenadaColuna } from './endereco-coordenada-coluna.entity';
import { EnderecoCoordenada } from './endereco-coordenada.entity';
import { DadosCoordenadaApartamento } from './dados-coordenada-apartamento.entity';
import { DadosCoordenadaAndar } from './dados-coordenada-andar.entity';
import { DadosCoordenadaColuna } from './dados-coordenada-coluna.entity';
import { DadosCoordenadaBlocoRua } from './dados-coordenada-bloco-rua.entity';

export class EnderecoArmazenagem {

  public static readonly MAXIMO_COORDENADAS = 1000;
  public static readonly MAXIMO_ENDERECOS = 10000;

  calculaBlocosRuas(dadosCoordenada: DadosCoordenadaBlocoRua): EnderecoCoordenada[] {

    if (
      this.isBlank(dadosCoordenada.valorInicial) ||
      this.isBlank(dadosCoordenada.valorFinal) ||
      !this.temApenasNumerosOuApenasLetras(dadosCoordenada.valorInicial.toString()) ||
      !this.temApenasNumerosOuApenasLetras(dadosCoordenada.valorFinal.toString())) {
      return [];
    }

    if (
      this.isSomenteNumero(dadosCoordenada.valorInicial.toString()) &&
      this.isSomenteNumero(dadosCoordenada.valorFinal.toString())
    ) {
      return this.calculaCoordenadasNumericas(dadosCoordenada);
    } else {
      return this.calculaCoordenadasAlfanumericas(dadosCoordenada);
    }
  }

  calculaColunas(dadosCoordenada: DadosCoordenadaColuna): EnderecoCoordenadaColuna[] {

    const colunas: EnderecoCoordenadaColuna[] = [];

    let quantidadeAGerar = EnderecoArmazenagem.MAXIMO_COORDENADAS;

    if (this.isBlank(dadosCoordenada.valorInicial) || this.isBlank(dadosCoordenada.valorFinal)) {
      return colunas;
    }

    if (dadosCoordenada.configuracao.configuracaoLados) {
      for (let valor = dadosCoordenada.valorInicial as number; valor <= (dadosCoordenada.valorFinal as number); valor++) {
        if (dadosCoordenada.direita) {
          if (dadosCoordenada.configuracao.prefixoLadoDireito) {
            colunas.push(
              EnderecoCoordenadaColuna.ladoDireito(
                valor.toString(),
                dadosCoordenada.configuracao.prefixoLadoDireito
              )
            );
            quantidadeAGerar--;
            if (quantidadeAGerar <= 0) {
              break;
            }
          } else if (
            dadosCoordenada.configuracao.tipoLadoDireito === 'PAR' && (valor % 2 === 0) ||
            dadosCoordenada.configuracao.tipoLadoDireito === 'IMPAR' && (valor % 2 !== 0)
          ) {
            colunas.push(
              EnderecoCoordenadaColuna.ladoDireito(
                valor.toString()
              )
            );
            quantidadeAGerar--;
            if (quantidadeAGerar <= 0) {
              break;
            }
          }
        }
        if (dadosCoordenada.esquerda) {
          if (dadosCoordenada.configuracao.prefixoLadoEsquerdo) {
            colunas.push(
              EnderecoCoordenadaColuna.ladoEsquerdo(
                valor.toString(),
                dadosCoordenada.configuracao.prefixoLadoEsquerdo
              )
            );
            quantidadeAGerar--;
            if (quantidadeAGerar <= 0) {
              break;
            }
          } else if (
            dadosCoordenada.configuracao.tipoLadoEsquerdo === 'PAR' && (valor % 2 === 0) ||
            dadosCoordenada.configuracao.tipoLadoEsquerdo === 'IMPAR' && (valor % 2 !== 0)
          ) {
            colunas.push(
              EnderecoCoordenadaColuna.ladoEsquerdo(
                valor.toString()
              )
            );
            quantidadeAGerar--;
            if (quantidadeAGerar <= 0) {
              break;
            }
          }
        }
      }
    } else {
      const coordenadas = this.calculaCoordenadasNumericas(dadosCoordenada);
      if (coordenadas.length > 0) {
        colunas.push(...coordenadas.map(
          coordenada => EnderecoCoordenadaColuna.semConfiguracaoLado(coordenada.valor)
        ));
      }
    }

    return colunas;
  }

  calculaAndares(dadosCoordenada: DadosCoordenadaAndar): EnderecoCoordenadaAndar[] {

    const andares: EnderecoCoordenadaAndar[] = [];

    if (this.isBlank(dadosCoordenada.valorInicial) || this.isBlank(dadosCoordenada.valorFinal)) {
      return andares;
    }

    const coordenadas = this.calculaCoordenadasNumericas(dadosCoordenada);
    if (coordenadas.length > 0) {
      andares.push(...coordenadas.map(coordenada => {
        if (dadosCoordenada.acessiveisAMao) {
          if (dadosCoordenada.acessiveisAMao.includes(coordenada.valor)) {
            return EnderecoCoordenadaAndar.acessivelAMao(coordenada.valor);
          } else {
            return EnderecoCoordenadaAndar.naoAcessivelAMao(coordenada.valor);
          }
        } else {
          return EnderecoCoordenadaAndar.padrao(coordenada.valor);
        }
      }));
    }

    return andares;
  }

  calculaApartamentos(dadosCoordenada: DadosCoordenadaApartamento): EnderecoCoordenada[] {

    if (this.isBlank(dadosCoordenada.valorInicial) || this.isBlank(dadosCoordenada.valorFinal)) {
      return [];
    }

    return this.calculaCoordenadasNumericas(dadosCoordenada);
  }

  private isSomenteNumero(valor: string): boolean {
    return /^\d+$/.test(valor);
  }

  private temApenasNumerosOuApenasLetras(valor: string): boolean {
    return /^[a-zA-Z]*$|^[0-9]*$/.test(valor);
  }

  private isBlank(valor: string | number): boolean {
    return valor === undefined || valor === null || valor.toString().trim() === '';
  }

  private calculaCoordenadasNumericas<T extends DadosCoordenada>(dadosCoordenada: T): EnderecoCoordenada[] {

    const coordenadas: EnderecoCoordenada[] = [];

    let quantidadeAGerar = EnderecoArmazenagem.MAXIMO_COORDENADAS;

    for (let valor = dadosCoordenada.valorInicial as number; valor <= (dadosCoordenada.valorFinal as number); valor++) {
      if (dadosCoordenada.hasOwnProperty('prefixo') && dadosCoordenada['prefixo'] && dadosCoordenada['prefixo'] !== '') {
        coordenadas.push(
          EnderecoCoordenada.comPrefixo(
            valor.toString(),
            dadosCoordenada['prefixo']
          )
        );
      } else {
        coordenadas.push(
          EnderecoCoordenada.semPrefixo(
            valor.toString()
          )
        );
      }

      quantidadeAGerar--;
      if (quantidadeAGerar <= 0) {
        break;
      }
    }

    return coordenadas;
  }

  private calculaCoordenadasAlfanumericas(dadosCoordenada: DadosCoordenadaBlocoRua): EnderecoCoordenada[] {

    const coordenadas: EnderecoCoordenada[] = [];

    let quantidadeAGerar = EnderecoArmazenagem.MAXIMO_COORDENADAS;

    if (dadosCoordenada.valorInicial.toString().length !== dadosCoordenada.valorFinal.toString().length) {
      return coordenadas;
    }

    if (dadosCoordenada.valorInicial === dadosCoordenada.valorFinal) {
      if (dadosCoordenada.prefixo && dadosCoordenada.prefixo !== '') {
        coordenadas.push(
          EnderecoCoordenada.comPrefixo(
            dadosCoordenada.valorInicial.toString(),
            dadosCoordenada.prefixo
          )
        );
      } else {
        coordenadas.push(
          EnderecoCoordenada.semPrefixo(
            dadosCoordenada.valorInicial.toString()
          )
        );
      }
    } else {

      const stringIni = dadosCoordenada.valorInicial.toString();
      const stringFim = dadosCoordenada.valorFinal.toString();
      const ini: number[] = stringIni.split('').map(x => x.charCodeAt(0));
      const fim: number[] = stringFim.split('').map(x => x.charCodeAt(0));
      const actual = stringIni.split('').map(x => x.charCodeAt(0));
      const posicaoParaAdd = fim.length - 1;

      for (
        let fixIniMaiorQueFim = 0;
        fixIniMaiorQueFim < fim.length;
        fixIniMaiorQueFim++
      ) {
        if (actual[fixIniMaiorQueFim] > fim[fixIniMaiorQueFim]) {
          actual[fixIniMaiorQueFim] = fim[fixIniMaiorQueFim];
          ini[fixIniMaiorQueFim] = fim[fixIniMaiorQueFim];
        }
      }

      let strActual = actual.map(u => String.fromCharCode(u)).join('');

      while (strActual !== stringFim) {
        if (actual[posicaoParaAdd] > fim[posicaoParaAdd]) {
          let somaAcima = posicaoParaAdd;
          while (somaAcima > 0 && actual[somaAcima] > fim[somaAcima]) {
            actual[somaAcima] = ini[somaAcima];
            actual[somaAcima - 1]++;
            somaAcima--;
          }
        }
        strActual = actual.map(u => String.fromCharCode(u)).join('');
        if (dadosCoordenada.prefixo && dadosCoordenada.prefixo !== '') {
          coordenadas.push(
            EnderecoCoordenada.comPrefixo(
              strActual,
              dadosCoordenada.prefixo
            )
          );
        } else {
          coordenadas.push(
            EnderecoCoordenada.semPrefixo(
              strActual
            )
          );
        }

        actual[posicaoParaAdd]++;
        quantidadeAGerar--;
        if (quantidadeAGerar <= 0) {
          break;
        }
      }
    }

    return coordenadas;
  }

  public gerarEnderecos(enderecoCoordenadas: EnderecoArmazenagemCoordenadas): Endereco[] {

    let enderecosCriado: Endereco[] = [];
    const listaEnderecoCoordenadas = [];

    const enderecoCoordenadasOrdenado = enderecoCoordenadas.getEnderecoCoordenadasOrdenado();
    for (const chave in enderecoCoordenadasOrdenado) {
      if (enderecoCoordenadasOrdenado.hasOwnProperty(chave)) {
        listaEnderecoCoordenadas.push({
          chave,
          dados: enderecoCoordenadas[chave]
        });
      }
    }

    enderecosCriado = this.criarEnderecos(0, listaEnderecoCoordenadas, Endereco.vazio());

    return enderecosCriado;
  }

  private criarEnderecos(
    posicaoAtual: number,
    listaCoordenadas: any[],
    endereco: Endereco
  ) {

    const listaEndereco = [];

    listaCoordenadas[posicaoAtual].dados.forEach(coordenada => {

      endereco.funcao = 'ARMAZENAGEM';
      endereco[listaCoordenadas[posicaoAtual].chave] = coordenada;
      const proximoPasso = posicaoAtual + 1;

      if (proximoPasso >= listaCoordenadas.length) {
        listaEndereco.push(endereco.clone());
      }
      if (proximoPasso < listaCoordenadas.length) {
        listaEndereco.push(...this.criarEnderecos(proximoPasso, listaCoordenadas, endereco));
      }
    });
    return listaEndereco;
  }
}
