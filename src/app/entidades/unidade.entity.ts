import { SegmentoEnum } from './segmento.enum';
import { IUnidade } from './unidade.interface';
import { UnidadeFederativa } from './unidade-federativa.enum';

export class Unidade {

  id: string;
  nome: string;
  cnpj: string;
  inscricaoEstadual: string;
  unidadeFederativa: UnidadeFederativa;
  segmento: SegmentoEnum;

  constructor(unidade: IUnidade) {
    this.id = unidade.id;
    this.nome = unidade.nome;
    this.cnpj = unidade.cnpj;
    this.inscricaoEstadual = unidade.inscricaoEstadual;
    this.unidadeFederativa = UnidadeFederativa[unidade.unidadeFederativa];
    this.segmento = SegmentoEnum.values.find(segmento => segmento.value === unidade.segmento);
  }

  public static vazio(): Unidade {
    return new Unidade({
      id: '',
      nome: '',
      cnpj: undefined,
      inscricaoEstadual: undefined,
      unidadeFederativa: undefined,
      segmento: undefined
    });
  }
}
