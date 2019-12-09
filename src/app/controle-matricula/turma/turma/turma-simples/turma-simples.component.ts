import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../../base/base.component";
import { FormGroup, FormControl, FormControlDirective } from "@angular/forms";

@Component({
    selector:  'app-turma-simples',
    templateUrl: './turma-simples.component.html',
    styleUrls: ['./turma-simples.component.css']
})
export class TurmaSimplesComponent extends BaseComponent implements OnInit {

    formTurmaSimples: FormGroup;

    constructor(){
        super();

        this.formTurmaSimples = new FormGroup({
            nome: new FormControl(''),
            apelido: new FormControl('')
        })
    }

    ngOnInit(): void {

    }
}