import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { BaseComponent } from '../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { ProfessorIncluirService } from '../services/professor-incluir.service';
import { Professor } from '../entities/professor.entity';
@Component({
    selector:  'app-professor-form',
    templateUrl: './professor-form.component.html',
    styleUrls: ['./professor-form.component.css']
})
export class ProfessorFormComponent extends BaseComponent implements OnInit {

    private formProfessor: FormGroup;
    private titulacaoList = [{ value: 'Mestre' }, { value: 'Doutor' }, { value: 'PHD'}];

    constructor(
        private global: GlobalService,
        private professorIncluirService: ProfessorIncluirService) {
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
        const professor = new Professor('teste', 'test', 'teste', 'tes', 'tes');
        this.professorIncluirService.Post(professor).subscribe( calback => {

        });
        console.log('salvando o professor');
        alert('salvar professor');
    }

}
