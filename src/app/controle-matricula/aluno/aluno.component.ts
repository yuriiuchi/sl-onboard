import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { cpfValidator } from 'totvs-log-base-foundation';

import { BaseComponent } from '../../base/base.component';
@Component({
    selector:  'app-aluno',
    templateUrl: './aluno.component.html',
    styleUrls: ['./aluno.component.css']
})
export class AlunoComponent extends BaseComponent implements OnInit {

    private formAluno: FormGroup;

    constructor() {
        super();

        this.formAluno = new FormGroup({
            nome: new FormControl('',  [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            cpf: new FormControl('', [Validators.required, cpfValidator()]),
            matricula: new FormControl('', [Validators.required]),
            formaIngresso: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {}

    public validForm(): boolean {
        return this.formAluno.valid;
    }

    salvar(): void {
        alert('salvar aluno');
    }
}
