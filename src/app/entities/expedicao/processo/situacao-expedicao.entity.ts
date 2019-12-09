import { SituacaoExpedicaoEnum } from './situacao-expedicao.enum';

export class SituacaoExpedicao {
    situacao: SituacaoExpedicaoEnum;
    motivo: string;
    quando: string;

    constructor(situacao: SituacaoExpedicaoEnum) {
        this.situacao = situacao;
    }
}
