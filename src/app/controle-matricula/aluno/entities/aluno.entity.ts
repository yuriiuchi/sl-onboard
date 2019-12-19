
import { Pessoa } from './../../pessoa/entities/pessoa.entity';
import { IAluno } from './aluno.interface';

export class Aluno extends Pessoa {

    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public cpf: string,
        public matricula: string,
        public formaIngresso: string
    ) {
        super(nome, email);
    }

    /* public static empty(): Aluno {
         return new Aluno('', '', '',  0, '');
    }*/

    static fromDto(dto: IAluno): Aluno {
        return new Aluno(
            dto.id,
            dto.nome,
            dto.email,
            dto.cpf,
            dto.matricula,
            dto.formaIngresso
        );
    }
}
enum FormaIngressoFaculdade {
    ENADE,
    vestibular
}
