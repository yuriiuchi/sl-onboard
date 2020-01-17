import { OnInit, Component, EventEmitter, Input } from '@angular/core';

import { GridDataResult, SortSettings, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { BaseComponent } from './../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { Router, ActivatedRoute } from '@angular/router';

import { TurmaDisciplinaGetAllService } from './../services/turma-disciplina-get-all.service';
import { PoPageAction, PoPopupAction } from '@portinari/portinari-ui';
import { TurmaDisciplina } from '../entities/turma-disciplina.entitiy';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';

@Component({
    selector: 'app-turma-list-form-disciplina',
    templateUrl: './turma-disciplina-list-form.component.html',
    styleUrls: ['./turma-disciplina-list-form.component.css']
})
export class TurmaDisciplinaListFormComponent extends BaseComponent implements OnInit {
    @Input() turmaId: string;

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

    public disciplinasSelecionadas: EventEmitter<Array<Disciplina>> = new EventEmitter<Array<Disciplina>>();
    public listDisciplinasSelecionadas: Array<Disciplina>;

    constructor(
        public global: GlobalService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private turmaDisciplinaGetAllService: TurmaDisciplinaGetAllService
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

    carregarGrid(disciplinas: any): void {
        this.disciplinas = disciplinas;
        this.disciplinasGrid = process(this.disciplinas, this.gridState);
    }

    carregarDisciplinas(): void {
        if (this.turmaId) {
            this.turmaDisciplinaGetAllService.Get(this.turmaId).subscribe(disciplinas => {
                this.carregarGrid(disciplinas);
            });
        }
    }

    public alteracaoEstadoDados(state: DataStateChangeEvent): void {
        this.gridState = state;
        this.disciplinasGrid = process(this.disciplinas, this.gridState);
    }

    alterarIdioma(): void {
        this.criarBotoesPagina();
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
