import { Pessoa } from './../../pessoa/entities/pessoa.entity';

export class Professor extends Pessoa {

    constructor(
        nome: String,
        email: String,
        public cpf: String,
        public titulacao: String
    ) {
        super(nome, email);
    }
    public empty() {
        return new Professor("", "", "", "");
    }

}

enum Titulacao {
    mestre, doutor, PHD
}

