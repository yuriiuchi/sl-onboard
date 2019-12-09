import { SituacaoDocumentoProcessoEnum } from '../situacao-documento-processo-enum';
import { IDocumentoExpedicaoNotaFiscal, IDocumentoExpedicaoNotaFiscalEndereco } from './documento-expedicao-nota-fiscal.interface';
import { DocumentoExpedicao } from './documento-expedicao.entity';
import { IDocumentoExpedicaoPessoa } from './documento-expedicao.interface';

export class DocumentoExpedicaoNotaFiscal extends DocumentoExpedicao {

  static get NotaFiscalItem() {
    return class NotaFiscalItem extends DocumentoExpedicao.Item  {
      constructor(
        id: string,
        origemId: string,
        sequencia: string,
        produto: DocumentoExpedicao.Produto,
        tipoEstoque: DocumentoExpedicao.TipoEstoque,
        quantidade: number,
        public valorUnitario: number,
        public valorTotal: number
      ) {
        super(id, origemId, sequencia, produto, tipoEstoque, quantidade);
       }
    };
  }

  constructor(
    id: string,
    identificadorDocumento: string,
    dataEmissao: Date,
    dataEntrega: Date,
    quantidadeVolumes: string,
    numeroViagem: string,
    depositante: IDocumentoExpedicaoPessoa,
    destinatario: IDocumentoExpedicaoPessoa,
    transportadora: IDocumentoExpedicaoPessoa,
    itens: Array<DocumentoExpedicaoNotaFiscal.NotaFiscalItem>,
    situacaoDocumentoProcesso: SituacaoDocumentoProcessoEnum,
    public enderecoEntrega?: IDocumentoExpedicaoNotaFiscalEndereco
  ) {
    super(id, identificadorDocumento, dataEmissao, dataEntrega,
      quantidadeVolumes, numeroViagem, depositante, destinatario,
      transportadora, itens, situacaoDocumentoProcesso);
   }

  static fromDto(dto: IDocumentoExpedicaoNotaFiscal) {
    const situacaoDocumentoProcesso = SituacaoDocumentoProcessoEnum.find(dto.situacaoDocumentoProcesso);
    const transportadora = (dto.transportadora) ?
      {
        nome: dto.transportadora.nome,
        documentoIdentificacao: dto.transportadora.documentoIdentificacao,
        pessoaFisica: dto.transportadora.pessoaFisica
      } : undefined;

    const depositante = (dto.depositante) ?
    {
      nome: dto.depositante.nome,
      documentoIdentificacao: dto.depositante.documentoIdentificacao,
      pessoaFisica: dto.depositante.pessoaFisica
    } : undefined;

    const destinatario = (dto.cliente) ?
    {
      nome: dto.cliente.nome,
      documentoIdentificacao: dto.cliente.documentoIdentificacao,
      pessoaFisica: dto.cliente.pessoaFisica
    } : undefined;

    const enderecoEntrega = (dto.enderecoEntrega) ?
    {
      logradouro: dto.enderecoEntrega.logradouro,
      numero: dto.enderecoEntrega.numero,
      complemento: dto.enderecoEntrega.complemento,
      bairro: dto.enderecoEntrega.bairro,
      cidade: dto.enderecoEntrega.cidade,
      unidadeFederativa: dto.enderecoEntrega.unidadeFederativa,
      pais: dto.enderecoEntrega.pais,
    } : undefined;

    const itens = new Array<DocumentoExpedicaoNotaFiscal.NotaFiscalItem>();
    if (dto.itens) {
      dto.itens.forEach(item => {
        itens.push(new DocumentoExpedicaoNotaFiscal.NotaFiscalItem(
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
          item.valorUnitario,
          item.valorTotal
        ));
      });
    }

    return new DocumentoExpedicaoNotaFiscal(
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
      enderecoEntrega
    );
  }
}

// https://github.com/Microsoft/TypeScript/issues/30183
// tslint:disable-next-line: no-namespace
export namespace DocumentoExpedicaoNotaFiscal {
  export type NotaFiscalItem = InstanceType<typeof DocumentoExpedicaoNotaFiscal.NotaFiscalItem>;
}
