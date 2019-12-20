import { OnInit, Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalService } from 'totvs-log-web-foundation';
import { PoPageAction } from '@portinari/portinari-ui';
import { BaseComponent } from 'src/app/base/base.component';


@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css']
})
export class TurmaListComponent extends BaseComponent implements OnInit {

  public actions: Array<PoPageAction> = this.getActions();

  constructor(
     public global: GlobalService,
     private readonly router: Router,
     private readonly activatedRoute: ActivatedRoute
  ) {
    super();

  }

  ngOnInit(): void {
    this.onChangeIdioma();
    //this.getTurmas();
  }

  onChangeIdioma(): void {

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
