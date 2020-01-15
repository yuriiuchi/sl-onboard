import { Pessoa } from './../../pessoa/entities/pessoa.entity';
import { IProfessorGetAll } from './professor-get-all.interface';

export class Professor extends Pessoa {

    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public cpf: string,
        public titulacao: string
    ) {
        super(nome, email);
    }

    static fromDto(dto: IProfessorGetAll): Professor {
        return new Professor(
            dto.id,
            dto.nome,
            dto.email,
            dto.cpf,
            dto.titulacao
        );
    }

}

enum Titulacao {
    mestre, doutor, PHD
}

