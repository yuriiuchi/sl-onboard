import { EstruturaFisicaConfiguracao } from './../../entidades/estrutura-fisica-configuracao.entity';
import { IEnderecoArmazenagemComponent } from './endereco-armazenagem-component.interface';

export interface EnderecoArmazenagemPasso {

  chave: string;
  label: string;
  componente: IEnderecoArmazenagemComponent;
  configuracao: EstruturaFisicaConfiguracao;

}
