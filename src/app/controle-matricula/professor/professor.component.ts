import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { BaseComponent } from '../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { ProfessorGetAllService } from './services/professor-get-all.service';
import { ProfessorAlterarService } from './services/professor-alterar.service';
import { ProfessorGetByIdService } from './services/professor-get-by-id.service';
import { ProfessorIncluirService } from './services/professor-incluir.service';
@Component({
    selector:  'app-professor',
    templateUrl: './professor.component.html',
    styleUrls: ['./professor.component.css']
})
export class ProfessorComponent extends BaseComponent implements OnInit {

    constructor(
        private global: GlobalService,
        private professorGetAllService: ProfessorGetAllService,
        private professorAlterarService: ProfessorAlterarService,
        private professorGetByIdService: ProfessorGetByIdService,
        private professorIncluirService: ProfessorIncluirService) {
        super();

    }

    ngOnInit() {}

}
