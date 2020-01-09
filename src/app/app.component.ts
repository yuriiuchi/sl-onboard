import { UnidadeGetAllService } from './services/unidade/unidade-get-all.service';
import { AppConfigService } from './app-config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService, IChangeLanguageLiterals, ChangeLanguageComponent } from 'totvs-log-web-foundation';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { AuthBaseService } from 'totvs-log-base-foundation';
import { User } from 'oidc-client';
import { PoToolbarProfile, PoToolbarAction, PoMenuItem } from '@portinari/portinari-ui';
import { take, filter } from 'rxjs/operators';
import { BaseComponent } from './base/base.component';
import { Unidade } from './entidades/unidade.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {

  @ViewChild(ChangeLanguageComponent, { static: true }) modalTrocarIdioma: ChangeLanguageComponent;

  mostraComponentes = false;
  apresentarMenu = true;

  informacoesPerfilUsuario: PoToolbarProfile;

  acoesPerfilUsuario: Array<PoToolbarAction>;

  itensMenu: Array<PoMenuItem> = [];

  unidadeAtual: Unidade = this.configuracaoAplicativo.getUnidadeAtual();

  literaisModalTrocarIdioma: IChangeLanguageLiterals = {
    modalTitle: 'idioma',
    radioGroupLabel: 'selecioneIdioma',
    saveAction: 'salvar',
    cancelAction: 'cancelar'
  };

  constructor(
    public global: GlobalService,
    private readonly configuracaoAplicativo: AppConfigService,
    private readonly unidadeGetAll: UnidadeGetAllService,
    private readonly rotas: Router,
    private readonly rotaAtivada: ActivatedRoute,
    private readonly autenticacao: AuthBaseService) {
    super();
  }

  ngOnInit() {
    this.gravarRotaAtual();
    this.tratarAutenticacaoEfetuada();
    this.configuracaoAplicativo.eventoUnidadeAlterada.subscribe((unidade: Unidade) => {
      this.unidadeAtual = unidade;
      this.informacoesPerfilUsuario.subtitle = this.getDescricaoUnidadePerfilUsuario(unidade);
    });
    this.configuracaoAplicativo.eventoApresentarMenu.subscribe((apresentaMenu: boolean) => {
      this.apresentarMenu = apresentaMenu;
    });
  }

  async ajustarComponentesAposTrocarIdioma(novoIdioma: string) {
    const usuario = await this.autenticacao.getUser();
    this.definirItensMenu(usuario);
    this.definirPerfilUsuario(usuario);
    this.configuracaoAplicativo.dispararEventoIdiomaAlterado(novoIdioma);
  }

  gravarRotaAtual() {
    this.rotas.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      if (!(event.url === '' || event.url === '/' || event.url.startsWith('/auth-callback'))) {
        localStorage.setItem('current.route', event.url);
      }
    });
  }

  tratarAutenticacaoEfetuada() {
    //YURI IUCHI Assinando a navegação 
    this.autenticacao.userLoadedEvent.pipe(
      take(1)
    ).subscribe((usuario: User) => {
      this.definirItensMenu(usuario);
      this.definirPerfilUsuario(usuario);
      this.tratarNavegacao();
    });
  }

  tratarNavegacao() {
    this.mostraComponentes = true;
    // tslint:disable-next-line: deprecation
    this.global.loading.executeLoading(() => new Promise<void>(async (resolve) => {
      const unidade = await this.identificarUnidadeAtual();
      if (unidade && unidade.id && unidade.id.trim() !== '') {
        await this.navegarParaRotaArmazenada();
      } else {
        await this.navegarParaConfiguracaoInicial();
      }
      resolve();
    }));
  }

  identificarUnidadeAtual(): Promise<Unidade> {
    return new Promise<Unidade>(resolve => {
      this.unidadeGetAll.getAll().subscribe(unidades => {
        if (unidades && unidades.length > 0) {
          this.configuracaoAplicativo.dispararEventoUnidadeAlterada(unidades[0]);
          resolve(unidades[0]);
        } else {
          resolve(undefined);
        }
      }, () => {
        resolve(undefined);
      });
    });
  }

  async navegarParaRotaArmazenada(): Promise<void> {

    let currentRoute = localStorage.getItem('current.route');
    let routerNav = 'home';
    if (currentRoute) {
      currentRoute = currentRoute.replace(/^\/+/g, '');
      routerNav = currentRoute;
    }

    if (routerNav === 'configuracaoInicial' && this.unidadeAtual.id && this.unidadeAtual.id !== '') {
      routerNav = 'home';
    }

    history.pushState(undefined, 'TOTVS WMS', routerNav);

    if (routerNav === 'home') {
      await this.rotas.navigate([routerNav]);
    } else {
      await this.rotas.navigate(['home']).then(async () => {
        await this.rotas.navigate([routerNav]);
      });
    }
  }

  async navegarParaConfiguracaoInicial(): Promise<void> {
    await this.rotas.navigate(['./configuracaoInicial'], {
      relativeTo: this.rotaAtivada
    });
  }

  menuAdd(label: string, shortLabel: string, link: string, icon: string): void {
    this.itensMenu.push({
      label: this.global.i18n.literals[label],
      shortLabel: this.global.i18n.literals[shortLabel],
      link,
      icon
    });
  }

  definirItensMenu(usuario: User) {
    this.itensMenu = [];

    this.itensMenu.push({
      label: this.global.i18n.literals.home,
      shortLabel: this.global.i18n.literals.home,
      link: 'home',
      icon: 'po-icon-home'
    });

    this.menuAdd('matriculas', 'matr', 'controle-matricula', 'po-icon po-icon-stock');
    this.menuAdd('alunos', 'alu', 'controle-matricula/alunos', 'po-icon po-icon-stock');
  }

  definirPerfilUsuario(usuario: User) {
    const unidade = this.configuracaoAplicativo.getUnidadeAtual();
    this.informacoesPerfilUsuario = {
      avatar: 'assets/images/totvs-logo-user.svg',
      title: usuario.profile.name[1],
      subtitle: this.getDescricaoUnidadePerfilUsuario(unidade)
    };

    this.acoesPerfilUsuario = [
      {
        icon: 'po-icon-world',
        label: this.global.i18n.literals.idioma,
        type: 'default',
        separator: false,
        action: () => {
          this.modalTrocarIdioma.openChangeLanguageModal();
        }
      },
      {
        icon: 'po-icon-exit',
        label: this.global.i18n.literals.sair,
        type: 'danger',
        separator: true,
        action: () => {
          this.autenticacao.logoutFlow();
        }
      }
    ];
  }

  getDescricaoUnidadePerfilUsuario(unidade: Unidade): string {
    return (unidade && unidade.nome !== '') ? `${this.global.i18n.literals.unidade} ${unidade.nome}` : '';
  }
}
