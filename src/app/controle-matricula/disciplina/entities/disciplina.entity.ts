import { Professor }  from './../../professor/entities/professor.entity'

export class Disciplina{

    constructor(
        public descricao: String, 
        public sigla: String, 
        public cargaHoraria: Number
    ){
       
    }

    public static empty(){
        return new Disciplina("", "", 0);       
    }
}