import { TipoEstruturaFisica } from 'src/app/entidades/tipo-estrutura-fisica.enum';

export interface IEnderecoConfiguracaoPassoUm {

  depositoId: string;
  descricaoDeposito?: string;
  estruturaFisicaId: string;
  tipoEstruturaFisica?: TipoEstruturaFisica;
  capacidadeUnitizador?: number;

}
