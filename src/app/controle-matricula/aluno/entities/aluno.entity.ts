
import { Pessoa } from './../../pessoa/entities/pessoa.entity';

export class Aluno extends Pessoa {

    id: string = '';

    constructor(
        nome: string,
        email: string,
        public cpf: string,
        public matricula: number,
        public formaIngresso: string
    ) {
        super(nome, email);
    }

    public static empty(): Aluno {
        return new Aluno('', '', '',  0, '');
    }
}
enum FormaIngressoFaculdade {
    ENADE,
    vestibular
}
