import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'totvs-log-web-foundation';
import { PoModalComponent, PoPageAction, PoModalAction } from '@portinari/portinari-ui';
import { BaseComponent } from 'src/app/base/base.component';
import { Aluno } from '../entities/aluno.entity';
import { GridDataResult, SortSettings, DataStateChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Router, ActivatedRoute } from '@angular/router';

import { AlunoGetAllService } from './../services/aluno-get-all.service';
import { Turma } from '../../turma/entities/turma.entitiy';
import { AlunoListFormComponent } from './aluno-list-form.component';

@Component({
    selector: 'app-aluno-list',
    templateUrl: './aluno-list.component.html',
    styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent extends BaseComponent implements OnInit {

  @ViewChild('formAluno', { static: true }) formAluno: AlunoListFormComponent;

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
    //YURI IUCHI SELECTABLE
    public selectable: SelectableSettings = {
      mode: 'multiple',
      checkboxOnly: true
    };

  constructor(
    public global: GlobalService
    ) {
    super();
  }

  ngOnInit(): void {

  }

  abrirModalAluno() {
    this.formAluno.abrirModalAluno();
  }

}
