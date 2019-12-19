import { OnInit, Component, ViewChild } from '@angular/core';

import { GlobalService } from 'totvs-log-web-foundation';
import { PoPageAction, PoPopupComponent, PoPopupAction } from '@portinari/portinari-ui';
import { process, State } from '@progress/kendo-data-query';
import { GridDataResult, SortSettings, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Turma } from './../entities/turma.entitiy';
import { ITurma } from './../entities/turma.interface';
import { BaseComponent } from 'src/app/base/base.component';

import { TurmaGetAllService } from './../services/turma-get-all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaGetByIdService } from './../services/turma-get-by-id.service';
import { TurmaIncluirService } from './../services/turma-incluir.service';
import { TurmaAlterarService } from './../services/turma-alterar.service';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css']
})
export class TurmaListComponent extends BaseComponent implements OnInit {

  public turmas: Array<Turma>;
  public turmasGrid: GridDataResult = { data: [], total: 0 };
  public sortable: SortSettings = {
    mode: 'multiple',
    allowUnsort: true
  };
  public actions: Array<PoPageAction> = this.getActions();

  public gridState: State = {
    group: [],
    sort: [],
    filter: null
  };
  public itemSelecionadoGrid: string;

  @ViewChild('popupMoreActions', { static: false }) private popup: PoPopupComponent;

  public readonly popupActions: Array<PoPopupAction> = [
    { label: 'Editar', action: () => { this.getTurmaById(); }, visible: true, disabled: false }
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

  public dataStateChange(state: DataStateChangeEvent): void {
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
      turma.nrVagas = 50;

      this.turmaAlterarService.Post(turma).subscribe( callback => {
        this.getTurmas();
        }
      );
    });

    // this.turmaByIdService.Get(this.itemSelecionadoGrid).subscribe( turma => {
    //   console.log(turma);
    // });
  }

  public clickMoreActions($event: Event, dataItem: Turma) {
    this.popup.target = $event.target;
    this.popup.toggle();
    this.itemSelecionadoGrid = dataItem.id;
  }

}
