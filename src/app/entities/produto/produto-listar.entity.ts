import { IProduto } from './produto.interface';

export class ProdutoListar {

  id: string;
  ativo: boolean;
  codigo: string;
  unidadesId: string[];
  depositante: string;
  unidadeMedida: string;
  descricaoComercial: string;
  descricaoInterna: string;

  constructor(
    id: string,
    ativo: boolean,
    codigo: string,
    unidadesId: string[],
    descricaoComercial: string,
    descricaoInterna: string,
    depositante?: string,
    unidadeMedida?: string,
  ) {
    this.id = id;
    this.ativo = ativo;
    this.codigo = codigo;
    this.unidadesId = unidadesId;
    this.depositante = depositante;
    this.unidadeMedida = unidadeMedida;
    this.descricaoComercial = descricaoComercial;
    this.descricaoInterna = descricaoInterna;
  }

  static fromDtoListar(dto: IProduto) {
    const unidades: string[] = dto.unidades.map(unidade => unidade.id);
    return new ProdutoListar(
      dto.id,
      dto.ativo,
      dto.codigo,
      unidades,
      dto.descricaoComercial,
      dto.descricaoInterna,
      dto.depositante ? dto.depositante.nome : '',
      dto.unidadeMedida
    );
  }
}
