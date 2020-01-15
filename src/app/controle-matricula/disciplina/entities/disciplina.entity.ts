import { IDisciplinaGetAll } from './disciplina-get-all.interface';

export class Disciplina {

    public id: string;

    constructor(
        id: string,
        public descricao: string,
        public sigla: string,
        public cargaHoraria: number,
        public professor
    ) {

    }

    static fromDto(dto: IDisciplinaGetAll): Disciplina {
        return new Disciplina(
            dto.id,
            dto.descricao,
            dto.sigla,
            dto.cargaHoraria,
            dto.professor
        );
    }
}
