import { Pessoa } from './../../pessoa/entities/pessoa.entity';

export class Professor extends Pessoa {

    constructor(
        id: string,
        nome: string,
        email: string,
        public cpf: string,
        public titulacao: string
    ) {
        super(nome, email);
    }
    public empty() {
        return new Professor('', '', '', '', '');
    }

}

enum Titulacao {
    mestre, doutor, PHD
}

