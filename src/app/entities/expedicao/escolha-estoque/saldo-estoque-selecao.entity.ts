import { ISaldoEstoqueSelecaoListar } from './saldo-estoque-selecao-listar.interface';

export class SaldoEstoqueSelecao {

  static get Endereco() {
    return class Endereco {
      constructor(
        public id: string,
        public descricao: string,
        public deposito: SaldoEstoqueSelecao.Deposito,
        public estruturaFisica: SaldoEstoqueSelecao.EstruturaFisica,
      ) { }
    };
  }

  static get Deposito() {
    return class Deposito {
      constructor(
        public id: string,
        public descricao: string
      ) { }
    };
  }

  static get EstruturaFisica() {
    return class EstruturaFisica {
      constructor(
        public id: string,
        public tipo: string
      ) { }
    };
  }

  static get SKU() {
    return class SKU {
      constructor(
        public id: string,
        public descricao: string,
        public quantidadeUnidadesProduto: number
      ) { }
    };
  }

  static get TipoEstoque() {
    return class TipoEstoque {
      constructor(
        public id: string,
        public descricao: string
      ) { }
    };
  }

  static get Unitizador() {
    return class Unitizador {
      constructor(
        public id: string,
        public valor: string
      ) { }
    };
  }

  get unitizador(): string {
    return this._unitizador.valor;
  }

  get tipoEstoqueDescricao(): string {
    return this._tipoEstoque.descricao;
  }

  get enderecoDescricao(): string {
    return this._endereco.descricao + ' - ' + this._endereco.deposito.descricao;
  }

  get skuDescricao(): string {
    return this._sku.descricao;
  }

  get skuQtdUnidades(): number {
    return this._sku.quantidadeUnidadesProduto;
  }

  public quantidadeSelecionada: number;

  constructor(
    public estoqueId: string,
    private _endereco: SaldoEstoqueSelecao.Endereco,
    private _sku: SaldoEstoqueSelecao.SKU,
    private _tipoEstoque: SaldoEstoqueSelecao.TipoEstoque,
    private _unitizador: SaldoEstoqueSelecao.Unitizador,
    public saldoDisponivel: number,
    public saldoDisponivelSKU: number,
    public avariado: boolean
  ) {
    this.quantidadeSelecionada = 0;
  }

  static fromDto(dto: ISaldoEstoqueSelecaoListar ) {
    return new SaldoEstoqueSelecao(
      dto.id,
      new SaldoEstoqueSelecao.Endereco(
        dto.endereco.id,
        dto.endereco.descricao,
        new SaldoEstoqueSelecao.Deposito(
          dto.endereco.deposito.id,
          dto.endereco.deposito.descricao
        ),
        new SaldoEstoqueSelecao.EstruturaFisica(
          dto.endereco.estruturaFisica.id,
          dto.endereco.estruturaFisica.tipo
        ),
      ),
      new SaldoEstoqueSelecao.SKU(
        dto.sku.id,
        dto.sku.descricao,
        dto.sku.quantidadeUnidadesProduto
      ),
      new SaldoEstoqueSelecao.TipoEstoque(
        dto.tipoEstoque.id,
        dto.tipoEstoque.descricao
      ),
      new SaldoEstoqueSelecao.Unitizador(
        dto.unitizador.id,
        dto.unitizador.valor
      ),
      dto.saldoDisponivel,
      dto.saldoDisponivelSKU,
      dto.avariado
    );
  }
}
/*
id: string;
endereco: {
  id: string;
  descricao: string;
  deposito: {
    id: string;
    descricao: string;
  },
  estruturaFisica: {
    id: string;
    tipo: string;
  }
};
sku: {
  id: string;
  descricao: string;
  quantidadeUnidadesProduto: number;
};
tipoEstoque: {
  id: string;
  descricao: string;
};
unitizador: {
  id: string;
  valor: string;
};
saldoDisponivel: number;
saldoDisponivelSKU: number;
avariado: boolean;
}
*/

// https://github.com/Microsoft/TypeScript/issues/30183
// tslint:disable-next-line: no-namespace
export namespace SaldoEstoqueSelecao {
  export type Endereco = InstanceType<typeof SaldoEstoqueSelecao.Endereco>;
  export type Deposito = InstanceType<typeof SaldoEstoqueSelecao.Deposito>;
  export type EstruturaFisica = InstanceType<typeof SaldoEstoqueSelecao.EstruturaFisica>;
  export type SKU = InstanceType<typeof SaldoEstoqueSelecao.SKU>;
  export type TipoEstoque = InstanceType<typeof SaldoEstoqueSelecao.TipoEstoque>;
  export type Unitizador = InstanceType<typeof SaldoEstoqueSelecao.Unitizador>;
}

