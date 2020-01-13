import { OnInit, Component, EventEmitter, Input } from '@angular/core';

import { GridDataResult, SortSettings, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { BaseComponent } from './../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { Router, ActivatedRoute } from '@angular/router';

import { TurmaAlunoGetAllService } from './../services/turma-aluno-get-all.service';
import { PoPageAction } from '@portinari/portinari-ui';
import { TurmaAluno } from '../entities/turma-aluno.entitiy';
import { Aluno } from '../../aluno/entities/aluno.entity';

@Component({
    selector: 'app-turma-list-form-aluno',
    templateUrl: './turma-aluno-list-form.component.html',
    styleUrls: ['./turma-aluno-list-form.component.css']
})
export class TurmaAlunoListFormComponent extends BaseComponent implements OnInit {

    private turmaId = '6d7e918a-e1c1-4eef-9436-07b1e7cab5f5';

    public alunos: Array<Aluno>;
    public alunosGrid: GridDataResult = { data: [], total: 0 };
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

    public alunosSelecionadas: EventEmitter<Array<Aluno>> = new EventEmitter<Array<Aluno>>();
    public listAlunosSelecionados: Array<Aluno>;

    constructor(
        public global: GlobalService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private turmaAlunoGetAllService: TurmaAlunoGetAllService
    ) {
        super();
    }

    criarBotoesPagina(): Array<PoPageAction> {
        return [];
    }

    ngOnInit(): void {
        this.alterarIdioma();
        this.carregarAlunos();
    }

    carregarGrid( alunos: any ): void {
        this.alunos = alunos;
        console.log('carregarGrid: ', alunos);
        this.alunosGrid = process(this.alunos, this.gridState);
    }

    carregarAlunos(): void {
        this.turmaAlunoGetAllService.Get(this.turmaId).subscribe( alunos => {
            this.carregarGrid(alunos);
        });
    }

    public alteracaoEstadoDados(state: DataStateChangeEvent): void {
        this.gridState = state;
        this.alunosGrid = process(this.alunos, this.gridState);
    }

    alterarIdioma(): void {
        this.criarBotoesPagina();
    }

    public onSelectedKeysChange(selecionadas) {
        const al: Array<Aluno> = [];

        selecionadas.forEach(id => {
            const aluno = this.alunos.find(d => d.id === id);
            if (aluno) {
                al.push(aluno);
            }
        });

        this.alunosSelecionadas.emit(al);
        this.listAlunosSelecionados = al;
        console.log('onSelectedKeysChange:', al);
    }

}
