import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { GlobalService } from "totvs-log-web-foundation";

@Component({
    selector: 'app-turma-detalhe',
    templateUrl: './turma-detalhe.component.html',
    styleUrls: [ './turma-detalhe.component.css']
})
export  class TurmaDetalheComponent implements OnInit {

    formTurmaDetalhe : FormGroup;

    constructor(private readonly global: GlobalService) {
        this.formTurmaDetalhe = new FormGroup({
            nrAlunos: new FormControl(''),
            inicio: new FormControl('')
        });
    }

    ngOnInit(): void {

    }
}