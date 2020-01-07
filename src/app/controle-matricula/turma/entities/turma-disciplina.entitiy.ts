import { Disciplina } from './../../disciplina/entities/disciplina.entity';
import { ITurma } from './../../../controle-matricula/turma/entities/turma.interface';

export class TurmaDisciplina {

    constructor(
        public listTurmaDisciplinas: Array<Disciplina>) {

    }

    static fromDto(dto: ITurma): TurmaDisciplina {
        return new TurmaDisciplina(
            dto.listDisciplinas
        );
    }
}
