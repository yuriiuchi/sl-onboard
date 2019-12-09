import { ESTRUTURA_FISICA_CONFIGURACOES } from './estrutura-fisica-configuracoes.const';
import { EstruturaFisicaConfiguracoes } from './estrutura-fisica-configuracoes.entity';
import { IEstruturaFisica } from './estrutura-fisica.interface';
import { TipoEstruturaFisicaEnum } from './tipo-estrutura-fisica.enum';

export class EstruturaFisica {

  id: string;
  unidadeId: string;
  tipo: TipoEstruturaFisicaEnum;
  ativo: boolean;
  configuracao: EstruturaFisicaConfiguracoes;
  alterado: boolean;
  backend: IEstruturaFisica;

  constructor(estruturaFisica: IEstruturaFisica) {
    this.id = estruturaFisica.id;
    this.unidadeId = estruturaFisica.unidadeId;
    this.alterado = estruturaFisica.alterado;
    this.tipo = TipoEstruturaFisicaEnum.values.find(e => e.value === estruturaFisica.tipo);
    this.ativo = estruturaFisica.ativo;
    this.configuracao = new EstruturaFisicaConfiguracoes(estruturaFisica);
    this.backend = estruturaFisica;
  }

  public funcaoOrdenacaoConfiguracoes = (configuracaoA: any, configuracaoB: any) => {
    const configuracoesParam = ESTRUTURA_FISICA_CONFIGURACOES;
    const ordemConfiguracaoA = configuracoesParam.find(c => c.chave === configuracaoA.key).ordem;
    const ordemConfiguracaoB = configuracoesParam.find(c => c.chave === configuracaoB.key).ordem;
    if (ordemConfiguracaoA < ordemConfiguracaoB) {
      return configuracaoB.key;
    }
  }
}
