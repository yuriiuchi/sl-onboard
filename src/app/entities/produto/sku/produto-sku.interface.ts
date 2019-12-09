import { ICodigoBarrasSku } from './codigos-barras.interface';

export interface IProdutoSku {

    descricao: string;
    id: string;
    ativo: boolean;
    produtoId: string;
    quantidadeUnidadesProduto: string;
    codigosBarras: ICodigoBarrasSku[];

}
