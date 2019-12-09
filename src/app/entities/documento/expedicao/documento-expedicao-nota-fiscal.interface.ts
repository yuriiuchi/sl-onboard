import { IDocumentoExpedicao, IDocumentoExpedicaoItem } from './documento-expedicao.interface';

export interface IDocumentoExpedicaoNotaFiscalItem extends IDocumentoExpedicaoItem {
  valorUnitario: number;
  valorTotal: number;
}

export interface IDocumentoExpedicaoNotaFiscalEndereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  unidadeFederativa: string;
  pais?: string;
}

export interface IDocumentoExpedicaoNotaFiscal extends IDocumentoExpedicao {
  itens: Array<IDocumentoExpedicaoNotaFiscalItem>;
  enderecoEntrega?: IDocumentoExpedicaoNotaFiscalEndereco;
}
