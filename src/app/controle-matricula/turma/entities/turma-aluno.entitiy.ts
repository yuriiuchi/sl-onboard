import { Aluno } from './../../aluno/entities/aluno.entity';
import { ITurma } from './../../../controle-matricula/turma/entities/turma.interface';

export class TurmaAluno {

    constructor(
        public listTurmaAlunos: Array<Aluno>) {

    }

    static fromDto(dto: ITurma): TurmaAluno {
        return new TurmaAluno(
            dto.listAlunos
        );
    }
}
