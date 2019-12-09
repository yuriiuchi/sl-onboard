import { IProduto } from './produto.interface';

export class Produto {

  id: string;
  ativo: boolean;
  codigo: string;
  unidadesId: string[];
  depositanteId?: string;
  unidadeMedida?: string;
  descricaoComercial: string;
  descricaoInterna: string;

  constructor(
    id: string,
    ativo: boolean,
    codigo: string,
    unidadesId: string[],
    descricaoComercial: string,
    descricaoInterna: string,
    depositanteId?: string,
    unidadeMedida?: string,
  ) {
    this.id = id;
    this.ativo = ativo;
    this.codigo = codigo;
    this.unidadesId = unidadesId;
    this.depositanteId = depositanteId;
    this.unidadeMedida = unidadeMedida;
    this.descricaoComercial = descricaoComercial;
    this.descricaoInterna = descricaoInterna;
  }

  static fromDto(dto: IProduto) {
    return new Produto(
      dto.id,
      dto.ativo,
      dto.codigo,
      dto.unidades.length ? dto.unidades.map(unidade => unidade.id) : undefined,
      dto.descricaoComercial,
      dto.descricaoInterna,
      dto.depositante ? dto.depositante.id : undefined,
      dto.unidadeMedida
    );
  }
}
