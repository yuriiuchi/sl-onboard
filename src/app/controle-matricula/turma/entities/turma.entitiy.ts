
// import { Aluno } from './aluno.entity';
// import { Disciplina } from './disciplina.entity'
import { ITurmaGetAll } from './turma-get-all.interface';

export class Turma {
    constructor(
        public id: string,
        public descricao: string,
        public ano: Number,
        public nrVagas: Number){
    }

    static fromDto(dto: ITurmaGetAll){
        return new Turma("","",0,0);
    }
}


/*
import { IRecebimentoListar } from './recebimento-get-all.interface';
import { SituacaoRecebimento } from './situacao-recebimento.entity';
import { SituacaoRecebimentoEnum } from './situacao-recebimento.enum';

export class Recebimento {
    id: string;
    descricao: string;
    situacao: SituacaoRecebimento;
    identificador: string;
    dataCriacao: Date;

    constructor(
        id: string,
        descricao: string,
        situacao: SituacaoRecebimentoEnum,
        identificador: string,
        dataCriacao: Date,
    ) {
        this.id = id;
        this.descricao = descricao;
        this.situacao = new SituacaoRecebimento(situacao);
        this.identificador = identificador;
        this.dataCriacao = dataCriacao;
    }


    static fromDto(dto: IRecebimentoListar) {

        return new Recebimento(
            dto.id,
            dto.descricao,
            SituacaoRecebimentoEnum.values[
                Object.keys(SituacaoRecebimentoEnum.values)
                .find(x => SituacaoRecebimentoEnum.values[x].value === dto.situacao)
            ],
            dto.identificador,
            new Date(dto.dataCriacao));
    }
}
*/