import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'totvs-log-web-foundation';
import { PoModalComponent, PoPageAction } from '@portinari/portinari-ui';
import { BaseComponent } from 'src/app/base/base.component';
import { Aluno } from '../entities/aluno.entity';
import { GridDataResult, SortSettings, DataStateChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Router, ActivatedRoute } from '@angular/router';

import { AlunoGetAllService } from './../services/aluno-get-all.service';
import { Turma } from '../../turma/entities/turma.entitiy';

@Component({
    selector: 'app-aluno-list-form',
    templateUrl: './aluno-list-form.component.html',
    styleUrls: ['./aluno-list-form.component.css']
})
export class AlunoListFormComponent extends BaseComponent implements OnInit {

  @ViewChild('modalAluno', { static: true }) modalAluno: PoModalComponent;
  @Output()

  public alunosSelecionados: EventEmitter<Array<Aluno>> = new EventEmitter<Array<Aluno>>();
  public listAlunosSelecionados: Array<Aluno>;


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

    //public disciplinasSelecionadas: EventEmitter<Array<Disciplina>> = new EventEmitter<Array<Disciplina>>();
    //public listDisciplinasSelecionadas: Array<Disciplina>;

    public selectable: SelectableSettings = {
      mode: 'multiple',
      checkboxOnly: true
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

  public onSelectedKeysChange(selecionados) {
    const al: Array<Aluno> = [];
    selecionados.forEach(id => {
      const aluno = this.alunos.find(d => d.id === id);
      if (aluno) {
        al.push(aluno);
      }
    });
    this.alunosSelecionados.emit(al);
    this.listAlunosSelecionados = al;
    console.log('Aluno - onSelectedKeysChange: ', al);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.gridState = state;
    this.alunosGrid = process(this.alunos, this.gridState);
  }
}
