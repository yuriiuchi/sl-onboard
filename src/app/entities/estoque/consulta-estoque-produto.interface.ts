import { IConsultaProdutoDepositante } from './consulta-estoque-depositante.interface';

export class IConsultaEstoqueProduto {

    id: string;
    codigo: string;
    descricaoComercial: string;
    depositante: IConsultaProdutoDepositante;

}
