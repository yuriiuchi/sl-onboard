import { Disciplina } from './../../disciplina/entities/disciplina.entity';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { ITurma } from './../../../controle-matricula/turma/entities/turma.interface';

export class Turma {
    constructor(
        public id: string,
        public descricao: string,
        public inicio: Date,
        public nrVagas: number,
        public listDisciplinas?: Array<Disciplina>,
        public listAlunos?: Array<Aluno>) {
            !this.listDisciplinas ? this.listDisciplinas = [] : this.listDisciplinas = this.listDisciplinas;
            !this.listAlunos ? this.listAlunos = [] : this.listAlunos = this.listAlunos;
        }

    static fromDto(dto: ITurma): Turma {
        console.log('From Dto ITurma');
        console.log(dto);
        return new Turma(
            dto.id,
            dto.descricao,
            dto.inicio,
            dto.nrVagas,
            dto.listDisciplinas,
            dto.listAlunos
        );
    }
}
