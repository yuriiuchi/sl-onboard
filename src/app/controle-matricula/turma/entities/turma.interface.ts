import { Disciplina } from './../../disciplina/entities/disciplina.entity';
import { Aluno } from './../../aluno/entities/aluno.entity';

export interface ITurma {
    id?: string;
    descricao: string;
    inicio: Date;
    nrVagas: number;
    listDisciplinas?: Array<Disciplina>;
    listAlunos?: Array<Aluno>;
}
