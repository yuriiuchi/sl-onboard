import { IConsultaEstoqueUnidade } from './consulta-estoque-unidade.interface';
import { IConsultaEstoqueEndereco } from './consulta-estoque-endereco.interface';
import { IConsultaEstoqueProduto } from './consulta-estoque-produto.interface';
import { IConsultaEstoqueSku } from './consulta-estoque-sku.interface';
import { IConsultaEstoqueTipo } from './consulta-estoque-tipo.interface';
import { IConsultaEstoqueUnitizador } from './consulta-estoque-unitizador.interface';

export interface IConsultaEstoque {
    id: string;
    unidade: IConsultaEstoqueUnidade;
    endereco: IConsultaEstoqueEndereco;
    produto: IConsultaEstoqueProduto;
    sku: IConsultaEstoqueSku;
    tipoEstoque: IConsultaEstoqueTipo;
    unitizador: IConsultaEstoqueUnitizador;
    saldo: string;
    saldoSKU: string;
    saldoReservado: string;
    saldoReservadoSKU: string;
    saldoDisponivel: string;
    saldoDisponivelSKU: string;
    situacao: string;
    avariado: boolean;
}

