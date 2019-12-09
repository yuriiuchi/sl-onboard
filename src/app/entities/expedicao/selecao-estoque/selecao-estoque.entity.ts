import { SituacaoSelecaoEstoqueEnum } from './situacao-selecao-estoque.enum';
import { ISelecaoEstoque } from './selecao-estoque.interface';

interface SelecaoEstoqueProduto {
  id: string;
  codigo: string;
  descricaoInterna: string;
}

interface SelecaoEstoqueTipoEstoque {
  id: string;
  descricao: string;
}

export class SelecaoEstoque {

  constructor(
    public unidadeId: string,
    public id: string,
    public documentoExpedicaoId: string,
    public documentoExpedicaoItemId: string,
    public produto: SelecaoEstoqueProduto,
    public tipoEstoque: SelecaoEstoqueTipoEstoque,
    public quantidadeSolicitada: number,
    public quantidadeSelecionada: number,
    public situacaoSelecaoEstoque: SituacaoSelecaoEstoqueEnum,
  ) {  }

  public get produtoFormatado(): string {
    return this.produto.codigo + ' - ' + this.produto.descricaoInterna;
  }

  static fromDto(dto: ISelecaoEstoque ) {
    return new SelecaoEstoque (
      dto.unidadeId,
      dto.id,
      dto.documentoExpedicaoId,
      dto.documentoExpedicaoItemId,
      {
        id: dto.produtoId,
        codigo: dto.produtoCodigo,
        descricaoInterna: dto.produtoDescricaoInterna,
      },
      {
        id: dto.tipoEstoqueId,
        descricao: dto.tipoEstoqueDescricao,
      },
      dto.quantidadeSolicitada,
      dto.quantidadeSelecionada,
      SituacaoSelecaoEstoqueEnum.values.find(x => x.value === dto.situacaoSelecaoEstoque)
    );
  }
}
