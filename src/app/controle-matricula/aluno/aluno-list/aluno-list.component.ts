import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'totvs-log-web-foundation';
import { PoModalComponent, PoPageAction } from '@portinari/portinari-ui';
import { BaseComponent } from 'src/app/base/base.component';
import { Aluno } from '../entities/aluno.entity';
import { GridDataResult, SortSettings, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Router, ActivatedRoute } from '@angular/router';

import { AlunoGetAllService } from './../services/aluno-get-all.service';

@Component({
    selector: 'app-aluno-list',
    templateUrl: './aluno-list.component.html',
    styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent extends BaseComponent implements OnInit {

    @ViewChild('modalAluno', { static: true }) modalAluno: PoModalComponent;

     public alunos: Array<Aluno>;
     public alunosGrid: GridDataResult = { data: [], total: 0 };
     public sortable: SortSettings = {
       mode: 'multiple',
       allowUnsort: true
     };

    //  public actions: Array<PoPageAction> = this.criarBotoesPagina();

     public gridState: State = {
       group: [],
       sort: [],
       filter: null
     };

    constructor(
        public global: GlobalService,
        private readonly router: Router,
        public readonly activatedRoute: ActivatedRoute,
        private alunoGetAllService: AlunoGetAllService
        ) {
        super();
    }

    ngOnInit(): void {
        this.alterarIdioma();
        this.carreagarAlunos();
    }

    alterarIdioma() {

    }

    abrirModalAluno(): void {
        this.modalAluno.open();
    }

    carreagarAlunos(): void {
        this.alunoGetAllService.reset().subscribe(turmas => {
            this.carregarGrid(turmas);
        });
    }

    private carregarGrid(alunos: any): void {
        this.alunos = alunos;
        this.alunosGrid = process(this.alunos, this.gridState);
    }

    public alteracaoEstadoDados(state: DataStateChangeEvent): void {
        this.gridState = state;
        this.alunosGrid = process(this.alunos, this.gridState);
    }

    // private criarBotoesPagina(): Array<PoPageAction> {
    //     return [
    //       { label: this.global.i18n.literals.inclusaoNovaTurma, action: this.incluirNovoAluno.bind(this), icon: 'po-icon-plus' }
    //     ];
    // }

    // private incluirNovoAluno(): void {
    //     this.router.navigate(['incluir'], { relativeTo: this.activatedRoute });
    // }
}
