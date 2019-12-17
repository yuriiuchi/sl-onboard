import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BaseComponent } from "../../../../base/base.component";
import { Turma } from '../../entities/turma.entitiy';
import { GlobalService } from 'totvs-log-web-foundation';

@Component({
    selector:  'app-turma-simples',
    templateUrl: './turma-simples.component.html',
    styleUrls: ['./turma-simples.component.css']
})
export class TurmaSimplesComponent extends BaseComponent implements OnInit {

    formTurmaSimples: FormGroup;
    idTurma: string = '10'

    get nome() {
        return this.formTurmaSimples.get('nome').value;
    }

    get descricao() {
        return this.formTurmaSimples.get('descricao').value;
    }

    get nrVagas() {
        return this.formTurmaSimples.get('nrVagas').value;
    }

    get inicio() {
        return this.formTurmaSimples.get('inicio').value;
    }

    constructor(private global: GlobalService){
        super();

        this.formTurmaSimples = new FormGroup({
            nome: new FormControl('', [Validators.required]),
            apelido: new FormControl('', [Validators.required]),
            nrVagas: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
            inicio: new FormControl('', [Validators.required])
        })
    }

    ngOnInit(): void {

    }

    public validForm(): boolean{        
        return this.formTurmaSimples.valid;
    }

    save(): void{
        if (this.formTurmaSimples.valid){

            const turma: Turma = {
                id: this.idTurma,               
                descricao: this.descricao,
                inicio: this.inicio,
                nrVagas: this.nrVagas,
                listDisciplinas: [],
                listAlunos: []
            }

        }
    } 
}