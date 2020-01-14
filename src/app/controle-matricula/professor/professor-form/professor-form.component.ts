import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { BaseComponent } from '../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
@Component({
    selector:  'app-professor-form',
    templateUrl: './professor-form.component.html',
    styleUrls: ['./professor-form.component.css']
})
export class ProfessorFormComponent extends BaseComponent implements OnInit {

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
        console.log("salvando o professor")
        alert('salvar professor');
    }

}
