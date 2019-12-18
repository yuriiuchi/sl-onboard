import { OnInit, Component } from '@angular/core';

import { GridDataResult, SortSettings, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { BaseComponent } from './../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { Router, ActivatedRoute } from '@angular/router';

import { Disciplina } from './../entities/disciplina.entity';
import { DisciplinaGetAllService } from './../services/disciplina-get-all.service';
import { PoPageAction } from '@portinari/portinari-ui';
@Component({
    selector: 'app-list-disciplina',
    templateUrl: './disciplina-list.component.html',
    styleUrls: ['./disciplina-list.component.css']
})
export class DisciplinaListComponent extends BaseComponent implements OnInit {

    public disciplinas: Array<Disciplina>;
    public disciplinasGrid: GridDataResult = { data: [], total: 0 };
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
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private disciplinaGetAllService: DisciplinaGetAllService
    ) {
        super();
    }

    criarBotoesPagina(): Array<PoPageAction> {
        return [];
    }

    ngOnInit(): void {
        this.alterarIdioma();
        this.carregarDisciplinas();
    }

    carregarGrid( disciplinas: any ): void {
        this.disciplinas = disciplinas;
        this.disciplinasGrid = process(this.disciplinas, this.gridState);
    }

    carregarDisciplinas(): void {
        this.disciplinaGetAllService.reset().subscribe( disciplinas => {
            this.carregarGrid(disciplinas);
        });
    }

    public alteracaoEstadoDados(state: DataStateChangeEvent): void {
        this.gridState = state;
        this.disciplinasGrid = process(this.disciplinas, this.gridState);
    }

    alterarIdioma(): void {
        this.criarBotoesPagina();
        /*this.criarBreadcrumb();
        //this.opcoesFiltroSituacao = this.getOpcoesFiltroSituacao();*/
    }
}
