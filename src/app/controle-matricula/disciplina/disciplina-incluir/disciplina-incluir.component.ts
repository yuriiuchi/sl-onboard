import { OnInit, Component, ViewChild, Input } from '@angular/core';
import { GlobalService } from 'totvs-log-web-foundation';
import { DisciplinaIncluirFormComponent } from './../disciplina-incluir-form/disciplina-incluir-form.component';

@Component({
    selector:  'app-disciplina-incluir',
    templateUrl: './disciplina-incluir.component.html',
    styleUrls: ['./disciplina-incluir.component.css']
})
export class DisciplinaIncluirComponent implements OnInit {

    @ViewChild('formDisciplina', { static: true }) public formDisciplina: DisciplinaIncluirFormComponent;
    @Input() turmaId: string;

    constructor(public global: GlobalService) {
    }

    ngOnInit(): void {
        this.onChangeIdiomas();
    }

    onChangeIdiomas(): void {

    }
}
