import { IConsultaEstoqueDeposito } from './consulta-estoque-deposito.interface';
import { IConsultaEstoqueEstruturaFisica } from './consulta-estoque-estrutura-fisica.interface';

export class IConsultaEstoqueEndereco {

    id: string;
    descricao: string;
    deposito: IConsultaEstoqueDeposito;
    estruturaFisica: IConsultaEstoqueEstruturaFisica;

}
