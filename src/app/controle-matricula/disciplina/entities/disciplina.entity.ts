import { Professor } from './../../professor/entities/professor.entity';

export class Disciplina {

    public id: string;

    constructor(
        public descricao: string,
        public sigla: string,
        public cargaHoraria: number
    ) {

    }

    public static empty() {
        return new Disciplina('', '', 0);
    }
}
