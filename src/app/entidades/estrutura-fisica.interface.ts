import { IEstruturaFisicaConfiguracaoColuna } from './estrutura-fisica-configuracao-coluna.interface';
import { IEstruturaFisicaConfiguracao } from './estrutura-fisica-configuracao.interface';
import { TipoEstruturaFisica } from './tipo-estrutura-fisica.enum';

export interface IEstruturaFisica {
  id: string;
  unidadeId: string;
  alterado: boolean;
  tipo: TipoEstruturaFisica;
  ativo: boolean;
  bloco?: IEstruturaFisicaConfiguracao;
  rua?: IEstruturaFisicaConfiguracao;
  coluna?: IEstruturaFisicaConfiguracaoColuna;
  andar?: IEstruturaFisicaConfiguracao;
  apartamento?: IEstruturaFisicaConfiguracao;
}
