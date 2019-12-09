import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AuthBaseService } from 'totvs-log-base-foundation';
import { GlobalService } from 'totvs-log-web-foundation';
import { BaseComponent } from './../base/base.component';
import { AppConfigService } from './../app-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  public get titulo(): string {
    return `${this.global.i18n.literals.bemVindo}, ${this.nomeUsuario}.`;
  }

  private nomeUsuario = '';

  constructor(
    public global: GlobalService,
    private readonly configuracaoAplicativo: AppConfigService,
    private readonly autenticacao: AuthBaseService
  ) {
    super();
  }

  ngOnInit() {
    this.mostraMensagemDeBoasVindas();
  }

  private async mostraMensagemDeBoasVindas() {
    const user = await this.autenticacao.getUser();
    this.nomeUsuario = user.profile.name[1];
    this.configuracaoAplicativo.eventoIdiomaAlterado.pipe(takeUntil(this.destroy$)).subscribe((novoIdioma) => {
    });
  }
}
