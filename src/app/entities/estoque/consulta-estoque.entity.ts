import { IConsultaEstoque } from './consulta-estoque.interface';
import { TipoEstruturaFisicaEnum } from '../../entidades/tipo-estrutura-fisica.enum';

export class ConsultaEstoque {

  get depositanteApresentacao() {
    return `${this.depositanteIdentificacao} - ${this.depositante}`;
  }
  id: string;
  unidade: string;
  deposito: string;
  endereco: string;
  depositante: string;
  depositanteIdentificacao: string;
  produto: string;
  codigoProduto: string;
  sku: string;
  tipoEstoque: string;
  tipoEstrutura: TipoEstruturaFisicaEnum;
  unitizador: string;
  saldo: string;
  saldoSku: string;
  quantidadeReservada: string;
  quantidadeReservadaSku: string;
  saldoDisponivel: string;
  saldoDisponivelSku: string;

  constructor(
    id: string,
    unidade: string,
    deposito: string,
    endereco: string,
    tipoEstrutura: TipoEstruturaFisicaEnum,
    depositante: string,
    depositanteIdentificacao: string,
    codigoProduto: string,
    produto: string,
    sku: string,
    tipoEstoque: string,
    saldo: string,
    saldoSku: string,
    saldoReservadoSKU: string,
    saldoReservado: string,
    saldoDisponivel: string,
    saldoDisponivelSku: string,
    unitizador: string
  ) {

    this.id = id;
    this.produto = produto;
    this.quantidadeReservada = saldoReservado;
    this.quantidadeReservadaSku = saldoReservadoSKU;
    this.saldoDisponivel = saldoDisponivel;
    this.saldoDisponivelSku = saldoDisponivelSku;
    this.sku = sku;
    this.tipoEstoque = tipoEstoque;
    this.tipoEstrutura = tipoEstrutura;
    this.unidade = unidade;
    this.unitizador = unitizador;
    this.depositante = depositante;
    this.endereco = endereco;
    this.codigoProduto = codigoProduto;
    this.deposito = deposito;
    this.depositanteIdentificacao = depositanteIdentificacao;
    this.saldoSku = saldoSku;
    this.saldo = saldo;
  }

  static fromDto(dto: IConsultaEstoque) {
    return new ConsultaEstoque(
      dto.id,
      dto.unidade.nome,
      dto.endereco.deposito.descricao,
      dto.endereco.descricao,
      TipoEstruturaFisicaEnum.values.find((tipo) => tipo.value === dto.endereco.estruturaFisica.tipo),
      dto.produto.depositante.nome,
      dto.produto.depositante.documentoIdentificacao,
      dto.produto.codigo,
      dto.produto.descricaoComercial,
      dto.sku.descricao,
      dto.tipoEstoque.descricao,
      dto.saldo,
      dto.saldoSKU,
      dto.saldoReservadoSKU,
      dto.saldoReservado,
      dto.saldoDisponivel,
      dto.saldoDisponivelSKU,
      (dto.unitizador) ? dto.unitizador.codigoBarras : ''
    );
  }
}
