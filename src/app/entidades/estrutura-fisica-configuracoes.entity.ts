import { ESTRUTURA_FISICA_CONFIGURACOES } from './estrutura-fisica-configuracoes.const';
import { EstruturaFisicaConfiguracao } from './estrutura-fisica-configuracao.entity';
import { EstruturaFisicaConfiguracaoColuna } from './estrutura-fisica-configuracao-coluna.entity';
import { IEstruturaFisica } from './estrutura-fisica.interface';

export class EstruturaFisicaConfiguracoes {

  bloco?: EstruturaFisicaConfiguracao;
  rua?: EstruturaFisicaConfiguracao;
  coluna?: EstruturaFisicaConfiguracaoColuna;
  andar?: EstruturaFisicaConfiguracao;
  apartamento?: EstruturaFisicaConfiguracao;

  constructor(estruturaFisica: IEstruturaFisica) {
    if (estruturaFisica) {
      ESTRUTURA_FISICA_CONFIGURACOES.forEach(configuracao => {
        if (estruturaFisica.hasOwnProperty(configuracao.chave)) {
          this[configuracao.chave] = (configuracao.chave === 'coluna') ?
            new EstruturaFisicaConfiguracaoColuna(configuracao.chave, estruturaFisica[configuracao.chave]) :
            new EstruturaFisicaConfiguracao(configuracao.chave, estruturaFisica[configuracao.chave]);
        }
      });
    }
  }
}
