import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { BaseComponent } from '../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
@Component({
    selector:  'app-professor',
    templateUrl: './professor.component.html',
    styleUrls: ['./professor.component.css']
})
export class ProfessorComponent extends BaseComponent implements OnInit {

    private formProfessor: FormGroup;
    private titulacaoList = [{ value: 'Mestre' }, { value: 'Doutor' }, { value: 'PHD'}];

    constructor(private global: GlobalService) {
        super();

        this.formProfessor = new FormGroup({
            nome: new FormControl('', [Validators.required]),
            titulacao: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {}

    public validForm(): boolean {
        return this.formProfessor.valid;
    }

    salvar(): void {
        alert('salvar professor');
    }

}
