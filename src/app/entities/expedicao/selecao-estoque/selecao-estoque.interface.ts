import { SituacaoSelecaoEstoque } from './situacao-selecao-estoque.enum';

export interface ISelecaoEstoque {
    unidadeId: string;
    id: string;
    documentoExpedicaoId: string;
    documentoExpedicaoItemId: string;
    produtoId: string;
    produtoCodigo: string;
    produtoDescricaoInterna: string;
    tipoEstoqueId: string;
    tipoEstoqueDescricao: string;
    quantidadeSolicitada: number;
    quantidadeSelecionada: number;
    situacaoSelecaoEstoque: SituacaoSelecaoEstoque;
}
