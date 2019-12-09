import { Component, OnInit } from "@angular/core";

import { BaseComponent } from './../../../../app/base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';

@Component({
    selector: 'app-turma-step',
    templateUrl:  './turma-step.component.html',
    styleUrls: ['./turma-step.component.css']
})
export class TurmaStepComponent extends BaseComponent implements OnInit {

    constructor(private global: GlobalService) {
        super();
    }

    ngOnInit(): void {

    }
} 