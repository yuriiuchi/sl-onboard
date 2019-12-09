import { OnInit, Component } from '@angular/core'

import { GlobalService } from 'totvs-log-web-foundation';
import { PoBreadcrumb, PoPageAction } from '@portinari/portinari-ui'
import { process, State } from '@progress/kendo-data-query';
import { SharedModule, GridDataResult, SortSettings, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { Turma } from './../entities/turma.entitiy';
import { BaseComponent } from 'src/app/base/base.component';

import { TurmaGetAllService } from './../services/turma-get-all.service';
import { AppConfigService } from 'src/app/app-config.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector:  'app-turma-list',
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
    
  constructor(
    public global: GlobalService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    //private readonly appConfig: AppConfigService,
    private turmaGetAllService: TurmaGetAllService
  ) {
    super();
    
  }
  
  ngOnInit(): void {
    this.onChangeIdioma();
    this.getTurmas();
    console.log('turma lista component aqui aqui aqui aqui');
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.gridState = state;
    this.turmasGrid = process(this.turmas, this.gridState);
  };
      
  onChangeIdioma(): void {

  }

  private loadGrid(turmas){
    this.turmas = turmas;
    this.turmasGrid = process(this.turmas, this.gridState);
  }

  private getTurmas(): void {
    this.turmaGetAllService.reset().subscribe( turmas => {
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
}


/*
import {
  GridDataResult,
  SortSettings,
  DataStateChangeEvent,
  //GridComponent
} from '@progress/kendo-angular-grid';

import { Turma } from './entities/turma.entity';
import { BaseComponent } from '../base/base.component';

import { ControleMatriculaGetAllService } from './services/controle-matricula-get-all.service'
// import { ActivatedRoute, Router } from '@angular/router';
// import { takeUntil } from 'rxjs/operators';
// import { AppConfigService } from '../app-config.service';
// import { MensagemCarregarTodosService } from '../shared/services/mensagem-carregar-todos.service';


@Component({
  selector: 'app-controle-matricula',
  templateUrl: './controle-matricula.component.html',
  styleUrls: ['./controle-matricula.component.css']
})

export class ControleMatriculaComponent extends BaseComponent implements OnInit {

  public breadcrumbItems: ThfBreadcrumb;
  public actions: Array<ThfPageAction>;
  public gridState: State = {
    group: [],
    sort: [],
    filter: null
  };

  public turmas: Array<Turma>;
  public turmasGrid: GridDataResult = { data: [], total: 0 };
  public sortable: SortSettings = {
    mode: "multiple",
    allowUnsort: true
  };
  public identificador = '';
  //public turma = '';

  public dataStateChange(state: DataStateChangeEvent): void {
    this.gridState = state;
    this.turmasGrid = process(this.turmas, this.gridState);
  };

  protected criarActions(): void{
    this.actions = [
      { label: this.global.i18n.literals.novaTurma,
        url: '/controle-matricula/incluir', 
        action: () =>{ 
          alert('Funcao')
        }, 
        disabled: undefined,
        icon: 'thf-icon-plus'
      }
    ];
  }

  // private criarActions(): void {
  //   this.actions = [
  //     {  label: this.global.i18n.literals.novoProcesso,
  //        url: '/controle-matricula/aluno', action: this.carregarExpedicoes , disabled: undefined, icon: 'thf-icon-plus' }
  //   ];
  // }

  constructor(public global: GlobalService,
    public controleMatriculaGetAllService: ControleMatriculaGetAllService
  ) {
    super();
  }
  // public global: GlobalService,
  // public recebimentoGetAllService: RecebimentoGetAllService,
  // public appConfigService: AppConfigService,
  // public thfNotification: ThfNotificationService,
  // public activatedRoute: ActivatedRoute,
  // public router: Router,
  // private mensagemCarregarTodos: MensagemCarregarTodosService,

  ngOnInit() {
    this.onChangeIdioma();
    this.carregarTurmas();
  }

  public onChangeIdioma(): void {
    this.criarBreadcrumb();
    this.criarActions();
  }

  private criarBreadcrumb(): void {
    this.breadcrumbItems = {
      items: [
        { label: this.global.i18n.literals.home, link: '/' },
        { label: this.global.i18n.literals.controleMatricula, link: '/controle-matricula' },
      ]
    };
  }

  private listaTurmas(turmas): void {
    this.turmas = turmas;
    this.turmasGrid = process(this.turmas, this.gridState);
  }

  public carregarTurmas(): void {
    //this.recebimentoGetAllService.setQueryFilter(null);
    this.controleMatriculaGetAllService.reset().subscribe(turmas => {
      this.listaTurmas(turmas);
    });
  }
}

/*

@Component({
  selector: 'app-recebimento',
  templateUrl: './recebimento.component.html',
  styleUrls: ['./recebimento.component.css']
})
export class RecebimentoComponent extends BaseComponent implements OnInit {
  public actions: Array<ThfPageAction>;
  public breadcrumbItems: ThfBreadcrumb;

  public searchTerm = '';

  public recebimentos: Array<Recebimento> = [];
  public recebimentosGrid: GridDataResult = { data: [], total: 0 };
  public fornecedorItem;
  public identificador;

  public sortable: SortSettings = {
    mode: 'multiple',
    allowUnsort: true
  };

  public gridState: State = {
    group: [],
    sort: [],
    filter: null
  };
  public opcoesFiltroSituacao: Array<ThfMultiselectOption> = this.getOpcoesFiltroSituacao();

  constructor(
    public global: GlobalService,
    public recebimentoGetAllService: RecebimentoGetAllService,
    public appConfigService: AppConfigService,
    public thfNotification: ThfNotificationService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private mensagemCarregarTodos: MensagemCarregarTodosService,

  ) {
    super();
  }

  ngOnInit() {
    this.onChangeIdioma();
    this.carregarRecebimentos();
    this.appConfigService.eventoIdiomaAlterado
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.onChangeIdioma();
      });
  }

  public onChangeIdioma(): void {
    this.criarActions();
    this.criarBreadcrumb();
    this.opcoesFiltroSituacao = this.getOpcoesFiltroSituacao();

  }
  private getOpcoesFiltroSituacao(): Array<ThfMultiselectOption> {
    return SituacaoRecebimentoEnum.values.map(x => x.thfSelect(this.global));
  }
  private criarActions(): void {
    this.actions = [
      {  label: this.global.i18n.literals.novoProcesso,
         url: '/recebimento/incluir', action: this.carregarRecebimentos , disabled: undefined, icon: 'thf-icon-plus' }
    ];
  }

  public carregarTodos(): void {
    this.mensagemCarregarTodos.question().subscribe((resposta: boolean) => {
      if (resposta) {
        this.recebimentoGetAllService.getAllSemPaginacao().subscribe(documentos => {
          this.listaRecebimentos(documentos);
        });
      }
    });
  }

  private criarBreadcrumb(): void {
    this.breadcrumbItems = {
      items: [
        { label: this.global.i18n.literals.home, link: '/' },
        { label: this.global.i18n.literals.recebimento, link: '/recebimento' },
      ]
    };
  }

  public get isLoading(): boolean {
    return this.recebimentoGetAllService.isLoading;
  }

  public get hasNext(): boolean {
    return this.recebimentoGetAllService.hasNext;
  }

  private listaRecebimentos(recebimentos): void {
    this.recebimentos = recebimentos;
    this.recebimentosGrid = process(this.recebimentos, this.gridState);
  }

  public carregarRecebimentos(): void {
    this.recebimentoGetAllService.setQueryFilter(null);
    this.recebimentoGetAllService.reset().subscribe(recebimentos => {
      this.listaRecebimentos(recebimentos);
    });
  }

  public carregarMais(): void {
    this.recebimentoGetAllService.more().subscribe(recebimentos => {
      this.listaRecebimentos(recebimentos);
    });
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.gridState = state;
    this.recebimentosGrid = process(this.recebimentos, this.gridState);
  }

  getLabelSituacaoRecebimento(situacao: SituacaoRecebimento) {
    const situacaoRecebimentoEnum = SituacaoRecebimentoEnum.values.find(x => x.value === situacao);
    return situacaoRecebimentoEnum.translateLabel(this.global);
  }
}

*/
