import { Endereco } from './endereco.entity';

export class EnderecoCoordenadaIncluir {

    unidadeId: string;
    depositoId: string;
    estruturaFisicaId: string;
    capacidadeUnitizador?: number;
    rotatividade?: number;
    enderecos: Endereco[];

}
