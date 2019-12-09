import { maskBr } from '../../../shared/formatUtils/mask';
import { IDocumentoExpedicao, IDocumentoExpedicaoPessoa } from './documento-expedicao.interface';
import { SituacaoDocumentoProcessoEnum } from '../situacao-documento-processo-enum';

export class DocumentoExpedicao {

  static get Item() {
    return class Item {
      constructor(
        public id: string,
        public origemId: string,
        public sequencia: string,
        public produto: DocumentoExpedicao.Produto,
        public tipoEstoque: DocumentoExpedicao.TipoEstoque,
        public quantidade: number
      ) { }
    };
  }

  static get Produto() {
    return class Produto {
      constructor(
        public id: string,
        public codigo: string,
        public descricaoInterna: string,
        public unidadeMedida: string
      ) { }

      get produtoFormatado(): string {
        return this.codigo + ' - ' + this.descricaoInterna;
      }
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

  constructor(
    public id: string,
    public identificadorDocumento: string,
    public dataEmissao: Date,
    public dataEntrega: Date,
    public quantidadeVolumes: string,
    public numeroViagem: string,
    public depositante: IDocumentoExpedicaoPessoa,
    public destinatario: IDocumentoExpedicaoPessoa,
    public transportadora: IDocumentoExpedicaoPessoa,
    public itens: Array<DocumentoExpedicao.Item>,
    public situacaoDocumentoProcesso: SituacaoDocumentoProcessoEnum,
  ) { }

  get depositanteFormatado(): string {
    if (this.depositante) {
      if (this.depositante.pessoaFisica) {
        return maskBr.cpf(this.depositante.documentoIdentificacao) + ' - ' + this.depositante.nome;
      } else {
        return maskBr.cnpj(this.depositante.documentoIdentificacao) + ' - ' + this.depositante.nome;
      }
    } else {
      return '';
    }
  }

  get destinatarioFormatado(): string {
    if (this.destinatario) {
      if (this.destinatario.pessoaFisica) {
        return maskBr.cpf(this.destinatario.documentoIdentificacao) + ' - ' + this.destinatario.nome;
      } else {
        return maskBr.cnpj(this.destinatario.documentoIdentificacao) + ' - ' + this.destinatario.nome;
      }
    } else {
      return '';
    }
  }

  get transportadoraFormatado(): string {
    if (this.transportadora) {
      if (this.transportadora.pessoaFisica) {
        return maskBr.cpf(this.transportadora.documentoIdentificacao) + ' - ' + this.transportadora.nome;
      } else {
        return maskBr.cnpj(this.transportadora.documentoIdentificacao) + ' - ' + this.transportadora.nome;
      }
    } else {
      return '';
    }
  }

  static fromDto(dto: IDocumentoExpedicao) {
    const situacaoDocumentoProcesso = SituacaoDocumentoProcessoEnum.find(dto.situacaoDocumentoProcesso);
    const transportadora: IDocumentoExpedicaoPessoa = (dto.transportadora) ?
      {
        nome: dto.transportadora.nome,
        documentoIdentificacao: dto.transportadora.documentoIdentificacao,
        pessoaFisica: dto.transportadora.pessoaFisica
      } : undefined;

    const depositante: IDocumentoExpedicaoPessoa = (dto.depositante) ?
    {
      nome: dto.depositante.nome,
      documentoIdentificacao: dto.depositante.documentoIdentificacao,
      pessoaFisica: dto.depositante.pessoaFisica
    } : undefined;

    const destinatario: IDocumentoExpedicaoPessoa = (dto.cliente) ?
    {
      nome: dto.cliente.nome,
      documentoIdentificacao: dto.cliente.documentoIdentificacao,
      pessoaFisica: dto.cliente.pessoaFisica
    } : undefined;

    const itens = new Array<DocumentoExpedicao.Item>();
    if (dto.itens) {
      dto.itens.forEach(item => {
        itens.push(new DocumentoExpedicao.Item(
          item.id,
          item.origemId,
          item.sequencia,
          new DocumentoExpedicao.Produto(
            item.produto.id,
            item.produto.codigo,
            item.produto.descricaoInterna,
            item.produto.unidadeMedida,
          ),
          new DocumentoExpedicao.TipoEstoque(
            item.tipoEstoqueId,
            null
          ),
          item.quantidade,
        ));
      });
    }

    return new DocumentoExpedicao(
      dto.id,
      dto.identificadorDocumento,
      new Date(dto.dataEmissao),
      new Date(dto.dataPrevistaSaida),
      dto.quantidadeVolumes,
      dto.numeroViagem,
      depositante,
      destinatario,
      transportadora,
      itens,
      situacaoDocumentoProcesso,
    );
  }
}

// https://github.com/Microsoft/TypeScript/issues/30183
// tslint:disable-next-line: no-namespace
export namespace DocumentoExpedicao {
  export type Item = InstanceType<typeof DocumentoExpedicao.Item>;
  export type Produto = InstanceType<typeof DocumentoExpedicao.Produto>;
  export type TipoEstoque = InstanceType<typeof DocumentoExpedicao.TipoEstoque>;
}
