
import { Pessoa } from "./../../pessoa/entities/pessoa.entity";

export class Aluno extends Pessoa {

    constructor(
        nome: String,
        email: String,
        public cpf: String,
        public matricula: Number,
        public formaIngresso: String
    ) {
        super(nome, email);
    }

    public static empty(): Aluno {
        return new Aluno("", "", "",  0, "");
    }
}
enum FormaIngressoFaculdade {
    ENADE,
    vestibular
}
