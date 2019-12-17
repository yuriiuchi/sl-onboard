import { ITurmaGetAll } from './turma-get-all.interface';
import { Disciplina } from './../../disciplina/entities/disciplina.entity'
import { Aluno } from '../../aluno/entities/aluno.entity';

export class Turma {

    listDisciplinas: Array<Disciplina> = [];
    listAlunos: Array<Aluno> = [];

    constructor(
        public id: string,
        public descricao: string,
        public inicio: Date,
        public nrVagas: Number){
    }

    static fromDto(dto: ITurmaGetAll){
        return new Turma("","", new Date(),0);
    }
}