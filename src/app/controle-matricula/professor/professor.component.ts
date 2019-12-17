import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { BaseComponent } from '../../base/base.component';
@Component({
    selector:  'app-professor',
    templateUrl: './professor.component.html',
    styleUrls: ['./professor.component.css']
})
export class ProfessorComponent extends BaseComponent implements OnInit {

    private formProfessor: FormGroup;

    constructor() {
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
