import { OnInit, Component, EventEmitter } from '@angular/core';

import { GridDataResult, SortSettings, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { BaseComponent } from './../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { Router, ActivatedRoute } from '@angular/router';

import { Disciplina } from './../entities/disciplina.entity';
import { DisciplinaGetAllService } from './../services/disciplina-get-all.service';
import { PoPageAction } from '@portinari/portinari-ui';
@Component({
    selector: 'app-list-form-disciplina',
    templateUrl: './disciplina-list-form.component.html',
    styleUrls: ['./disciplina-list-form.component.css']
})
export class DisciplinaListFormComponent extends BaseComponent implements OnInit {

    public disciplinas: Array<Disciplina>;
    public disciplinasGrid: GridDataResult = { data: [], total: 0 };
    public listDisciplinasSelecionadas: Array<Disciplina>;
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

    public disciplinasSelecionadas: EventEmitter<Array<Disciplina>> = new EventEmitter<Array<Disciplina>>();
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
        console.log('carregarDisciplinas(): void {: ', '123');
        this.disciplinaGetAllService.reset().subscribe( disciplinas => {
            console.log('carregarDisciplinas(): void {2:', disciplinas);
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

    public onSelectedKeysChange(selecionadas) {
        const dis: Array<Disciplina> = [];
        selecionadas.forEach(id => {
          const disciplina = this.disciplinas.find(d => d.id === id);
          if (disciplina) {
            dis.push(disciplina);
          }
        });
        this.disciplinasSelecionadas.emit(dis);
        this.listDisciplinasSelecionadas = dis;
      }
}
