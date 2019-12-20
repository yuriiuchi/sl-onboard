import { OnInit, Component, ViewChild } from '@angular/core';

import { GlobalService } from 'totvs-log-web-foundation';
import { PoPageAction, PoPopupComponent, PoPopupAction, PoModalComponent } from '@portinari/portinari-ui';
import { process, State } from '@progress/kendo-data-query';
import { GridDataResult, SortSettings, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Turma } from './../entities/turma.entitiy';
import { BaseComponent } from './../../../base/base.component';

import { TurmaGetAllService } from './../services/turma-get-all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaGetByIdService } from './../services/turma-get-by-id.service';
import { TurmaIncluirService } from './../services/turma-incluir.service';
import { TurmaAlterarService } from './../services/turma-alterar.service';

@Component({
  selector: 'app-turma-list-form',
  templateUrl: './turma-list-form.component.html',
  styleUrls: ['./turma-list-form.component.css']
})
export class TurmaListFormComponent extends BaseComponent implements OnInit {

  turmas: Array<Turma>;
  turmasGrid: GridDataResult = { data: [], total: 0 };
  sortable: SortSettings = {
    mode: 'multiple',
    allowUnsort: true
  };
  actions: Array<PoPageAction> = this.getActions();

  gridState: State = {
    group: [],
    sort: [],
    filter: null
  };
  itemSelecionadoGrid: string;

  @ViewChild('popupMoreActions', { static: false }) private popup: PoPopupComponent;
  @ViewChild('modalEditarTurma', { static: true }) modalEditarTurma: PoModalComponent;

  readonly popupActions: Array<PoPopupAction> = [
    { label: 'Editar', action: () => {
      this.getTurmaById();
      this.abrirModalEditarTurma();
    }, visible: true, disabled: false }
  ];

  constructor(
    public global: GlobalService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private turmaGetAllService: TurmaGetAllService,
    private turmaByIdService: TurmaGetByIdService,
    private turmaIncluirService: TurmaIncluirService,
    private turmaAlterarService: TurmaAlterarService
  ) {
    super();

  }

  ngOnInit(): void {
    this.onChangeIdioma();
    this.getTurmas();
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.gridState = state;
    this.turmasGrid = process(this.turmas, this.gridState);
  }

  onChangeIdioma(): void {

  }

  private loadGrid(turmas) {
    this.turmas = turmas;
    this.turmasGrid = process(this.turmas, this.gridState);
  }

  private getTurmas(): void {
    this.turmaGetAllService.reset().subscribe(turmas => {
      this.loadGrid(turmas);
    });
  }

  private incluirNovaTurma(): void {
    this.router.navigate(['incluir'], { relativeTo: this.activatedRoute });
  }

  private getActions(): Array<PoPageAction> {
    return [
      { label: this.global.i18n.literals.inclusaoNovaTurma, action: this.incluirNovaTurma.bind(this), icon: 'po-icon-plus' }
    ];
  }

  private getTurmaById() {
    this.turmaByIdService.Get(this.itemSelecionadoGrid).subscribe( turma => {
      turma.nrVagas = turma.nrVagas; //50

      // this.turmaAlterarService.Post(turma).subscribe( callback => {
      //   this.getTurmas();
      //   }
      // );
    });

    // this.turmaByIdService.Get(this.itemSelecionadoGrid).subscribe( turma => {
    //   console.log(turma);
    // });
  }

  clickMoreActions($event: Event, dataItem: Turma) {
    this.popup.target = $event.target;
    this.popup.toggle();
    this.itemSelecionadoGrid = dataItem.id;
  }

  abrirModalEditarTurma(): void {
    console.log('abrir modal:');
    console.log(this.itemSelecionadoGrid);
    this.modalEditarTurma.open();
  }

}
