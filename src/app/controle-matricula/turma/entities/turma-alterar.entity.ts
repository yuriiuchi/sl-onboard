import { Turma } from './turma.entitiy';
import { Disciplina } from './../../disciplina/entities/disciplina.entity';
import { Aluno } from '../../aluno/entities/aluno.entity';

export class TurmaAlterar {

    id: string;
    descricao: string;
    inicio: Date;
    nrVagas: number;
    listDisciplinas?: Array<Disciplina>;
    listAlunos?: Array<Aluno>;

    constructor(turma: Turma) {
        this.id =  turma.id;
        this.descricao = turma.descricao;
        this.inicio = turma.inicio;
        this.nrVagas = turma.nrVagas;
        this.listDisciplinas = turma.listDisciplinas;
        this. listAlunos = turma.listAlunos;
    }

}
