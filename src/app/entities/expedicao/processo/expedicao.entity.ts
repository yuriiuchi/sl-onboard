import { SituacaoExpedicao } from './situacao-expedicao.entity';
import { SituacaoExpedicaoEnum } from './situacao-expedicao.enum';
import { IExpedicaoListar } from './expedicao-get-all.interface';

export class Expedicao {
    id: string;
    descricao: string;
    situacao: SituacaoExpedicao;
    identificador: string;
    dataCriacao: Date;

    constructor(
        id: string,
        descricao: string,
        situacao: SituacaoExpedicaoEnum,
        identificador: string,
        dataCriacao: Date,
    ) {
        this.id = id;
        this.descricao = descricao;
        this.situacao = new SituacaoExpedicao(situacao);
        this.identificador = identificador;
        this.dataCriacao = dataCriacao;
    }

    static fromDto(dto: IExpedicaoListar) {

        return new Expedicao(
            dto.id,
            dto.descricao,
            SituacaoExpedicaoEnum.values[
                Object.keys(SituacaoExpedicaoEnum.values)
                .find(x => SituacaoExpedicaoEnum.values[x].value === dto.situacao)
            ],
            dto.identificador,
            dto.dataCriacao);
    }
}
