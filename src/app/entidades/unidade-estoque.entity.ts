import { ControleEstoqueEnum } from './controle-estoque.enum';
import { IUnidadeEstoque } from './unidade-estoque.interface';

export class UnidadeEstoque {

  id: string;
  controleEstoque: ControleEstoqueEnum;

  constructor(unidadeEstoque: IUnidadeEstoque) {
    this.id = unidadeEstoque.id;
    if (unidadeEstoque.controleEstoque) {
      this.controleEstoque = ControleEstoqueEnum.values.find(item => item.value === unidadeEstoque.controleEstoque);
    }
  }

  public static vazio(): UnidadeEstoque {
    return new UnidadeEstoque({
      id: undefined,
      controleEstoque: undefined
    });
  }
}
