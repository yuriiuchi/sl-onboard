import { EnderecoCoordenadaAndar } from './endereco-coordenada-andar.entity';
import { EnderecoCoordenadaColuna } from './endereco-coordenada-coluna.entity';
import { EnderecoCoordenada } from './endereco-coordenada.entity';
import { Endereco } from './endereco.entity';
import { EnderecoCoordenadaIncluir } from './endereco-coordenada-incluir.entity';

class BlocoValor {

  prefixo: string;
  valor: string;

  constructor(enderecoCoordenada: EnderecoCoordenada) {
    this.prefixo = enderecoCoordenada.prefixo;
    this.valor = enderecoCoordenada.valor;
  }
}

class RuaValor {

  prefixo: string;
  valor: string;

  constructor(enderecoCoordenada: EnderecoCoordenada) {
    this.prefixo = enderecoCoordenada.prefixo;
    this.valor = enderecoCoordenada.valor;
  }
}

class ColunaValor {

  orientacao: string;
  prefixo: string;
  valor: number;

  constructor(enderecoCoordenada: EnderecoCoordenadaColuna) {
    this.prefixo = enderecoCoordenada.prefixo;
    this.valor = parseInt(enderecoCoordenada.valor, 10);
    this.orientacao = enderecoCoordenada.orientacao;
  }
}

class AndarValor {

  acessivelMao: boolean;
  valor: number;

  constructor(enderecoCoordenada: EnderecoCoordenadaAndar) {
    this.valor = parseInt(enderecoCoordenada.valor, 10);
    this.acessivelMao = enderecoCoordenada.acessivelAMao;
  }
}

class ApartamentoValor {

  valor: number;

  constructor(enderecoCoordenada: EnderecoCoordenada) {
    this.valor = parseInt(enderecoCoordenada.valor, 10);
  }
}

class EnderecoCriar {

  funcao: string;
  descricao?: string;
  blocoValor?: BlocoValor;
  ruaValor?: RuaValor;
  colunaValor?: ColunaValor;
  andarValor?: AndarValor;
  apartamentoValor?: ApartamentoValor;

  constructor(endereco: Endereco) {
    this.funcao = endereco.funcao;
    this.descricao = endereco.descricao;
    if (endereco.bloco) {
      this.blocoValor = new BlocoValor(endereco.bloco);
    }
    if (endereco.rua) {
      this.ruaValor = new RuaValor(endereco.rua);
    }
    if (endereco.coluna) {
      this.colunaValor = new ColunaValor(endereco.coluna);
    }
    if (endereco.andar) {
      this.andarValor = new AndarValor(endereco.andar);
    }
    if (endereco.apartamento) {
      this.apartamentoValor = new ApartamentoValor(endereco.apartamento);
    }
  }
}

export class EnderecoCriarEmLote {

  unidadeId: string;
  estruturaFisicaId: string;
  depositoId: string;
  capacidadeUnitizador?: number;
  rotatividade?: number;
  enderecos: EnderecoCriar[];

  constructor(enderecoCoordenadaIncluir: EnderecoCoordenadaIncluir) {
    this.unidadeId = enderecoCoordenadaIncluir.unidadeId;
    this.estruturaFisicaId = enderecoCoordenadaIncluir.estruturaFisicaId;
    this.depositoId = enderecoCoordenadaIncluir.depositoId;
    this.capacidadeUnitizador = enderecoCoordenadaIncluir.capacidadeUnitizador;
    this.rotatividade = enderecoCoordenadaIncluir.rotatividade;
    this.enderecos = enderecoCoordenadaIncluir.enderecos.map(endereco => new EnderecoCriar(endereco));
  }
}
