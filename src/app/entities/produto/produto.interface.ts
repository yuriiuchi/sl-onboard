import { IDepositanteProduto } from './depositante-produto.interface';
import { IUnidadeProduto } from './unidade-produto.interface';

export interface IProduto {

    id: string;
    ativo: boolean;
    codigo: string;
    depositante: IDepositanteProduto;
    unidades: IUnidadeProduto[];
    unidadeMedida: string;
    descricaoComercial: string;
    descricaoInterna: string;
}
