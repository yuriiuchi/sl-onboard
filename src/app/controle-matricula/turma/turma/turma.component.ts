import { OnInit, Component, ViewChild, Input } from '@angular/core';

import { GlobalService } from 'totvs-log-web-foundation';

import { PoButtonGroupItem } from '@portinari/portinari-ui';
import { TurmaSimplesComponent } from './turma-simples/turma-simples.component';

@Component({
    selector:  'app-turma',
    templateUrl: './turma.component.html',
    styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

    @ViewChild('simples', { static: true }) public simples: TurmaSimplesComponent;
    @Input() turmaId: string;
    //@Input() set turmaId(x) { console.log('log: ', x); }

    botoesAbas: Array<PoButtonGroupItem>;

    constructor(public global: GlobalService) {
    }

    ngOnInit(): void {
        this.onChangeIdiomas();
    }

    onChangeIdiomas(): void {

    }
}
