import { OnInit, Component } from '@angular/core';

import { GridDataResult, SortSettings, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { BaseComponent } from './../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { Router, ActivatedRoute } from '@angular/router';

import { Professor } from './../entities/professor.entity';
import { ProfessorGetAllService } from './../services/professor-get-all.service';
import { PoPageAction } from '@portinari/portinari-ui';
@Component({
    selector: 'app-list-professor',
    templateUrl: './professor-list.component.html',
    styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent extends BaseComponent implements OnInit {

    public professores: Array<Professor>;
    public professoresGrid: GridDataResult = { data: [], total: 0 };
    public sortable: SortSettings = {
        mode: 'multiple',
        allowUnsort: true
    };
    public gridState: State = {
        group: [],
        sort: [],
        filter: null
    };
    public actions: Array<PoPageAction> = this.criarBotoesPagina();

    constructor(
        public global: GlobalService,
    ) {
        super();
    }

    ngOnInit(): void {

    }

    criarBotoesPagina(): Array<PoPageAction> {
        return [];
    }

    alterarIdioma(): void {
        this.criarBotoesPagina();
    }
}
