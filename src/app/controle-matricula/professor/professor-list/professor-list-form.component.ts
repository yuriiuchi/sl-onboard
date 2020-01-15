import { OnInit, Component, EventEmitter } from '@angular/core';

import { GridDataResult, SortSettings, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { BaseComponent } from './../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { Router, ActivatedRoute } from '@angular/router';

import { Professor } from './../entities/professor.entity';
import { ProfessorGetAllService } from './../services/professor-get-all.service';
import { PoPageAction } from '@portinari/portinari-ui';
@Component({
    selector: 'app-list-form-professor',
    templateUrl: './professor-list-form.component.html',
    styleUrls: ['./professor-list-form.component.css']
})
export class ProfessorListFormComponent extends BaseComponent implements OnInit {

    public professores: Array<Professor>;
    public professoresGrid: GridDataResult = { data: [], total: 0 };
    public listProfessoresSelecionados: Array<Professor>;
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

    public professoresSelecionados: EventEmitter<Array<Professor>> = new EventEmitter<Array<Professor>>();
    constructor(
        public global: GlobalService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private professorGetAllService: ProfessorGetAllService
    ) {
        super();
    }

    criarBotoesPagina(): Array<PoPageAction> {
        return [];
    }

    ngOnInit(): void {
        this.alterarIdioma();
        this.carregarProfessores();
    }

    carregarGrid( professores: any ): void {
        this.professores = professores;
        this.professoresGrid = process(this.professores, this.gridState);
    }

    carregarProfessores(): void {
        this.professorGetAllService.reset().subscribe( professores => {
            this.carregarGrid(professores);
        });
    }

    public alteracaoEstadoDados(state: DataStateChangeEvent): void {
        this.gridState = state;
        this.professoresGrid = process(this.professores, this.gridState);
    }

    alterarIdioma(): void {
        this.criarBotoesPagina();
    }

    public onSelectedKeysChange(selecionadas) {
        const dis: Array<Professor> = [];
        selecionadas.forEach(id => {
          const professor = this.professores.find(d => d.id === id);
          if (professor) {
            dis.push(professor);
          }
        });
        this.professoresSelecionados.emit(dis);
        this.listProfessoresSelecionados = dis;
      }
}
