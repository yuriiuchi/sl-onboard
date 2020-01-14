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

    constructor(private global: GlobalService) {
        super();

    }

    ngOnInit() {}

}
