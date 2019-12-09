import { Unidade } from './entidades/unidade.entity';
import { AuthService } from 'totvs-log-web-foundation';
import { AuthBaseService, UrlUtils } from 'totvs-log-base-foundation';
import { environment } from './../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from './entidades/app-config.interface';
import { configuracaoAutenticacao } from './app-config-autenticacao';

export const appConfigLocation = `assets/data/${environment.arquivoConfiguracao}`;

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public static idiomasSuportados = [
    { language: 'pt-BR' },
    { language: 'en-US' },
    { language: 'es' }
  ];

  public static TEMPO_PADRAO_PROCESSAMENTO = 1000;

  private unidadeCorrente: Unidade = Unidade.vazio();

  private readonly _eventoUnidadeAlterada: EventEmitter<Unidade> = new EventEmitter();
  public get eventoUnidadeAlterada(): EventEmitter<Unidade> {
    return this._eventoUnidadeAlterada;
  }

  private readonly _eventoIdiomaAlterado: EventEmitter<string> = new EventEmitter<string>();
  public get eventoIdiomaAlterado(): EventEmitter<string> {
    return this._eventoIdiomaAlterado;
  }

  private _apresentarMenu = true;
  get apresentarMenu(): boolean {
    return this._apresentarMenu;
  }

  private readonly _eventoApresentarMenu: EventEmitter<boolean> = new EventEmitter();
  public get eventoApresentarMenu(): EventEmitter<boolean> {
    return this._eventoApresentarMenu;
  }

  private _configuracoes: IAppConfig;
  public get configuracoes(): IAppConfig {
    return this._configuracoes;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly autenticacao: AuthBaseService
  ) { }

  loadAppConfig(): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.http.get(appConfigLocation).subscribe(async (data) => {

        this._configuracoes = data as IAppConfig;

        try {
          await this.autenticacao.changeAuthSettings(AuthService.AddOriginUrls(Object.assign(configuracaoAutenticacao, {
            authority: this.configuracoes.urlAutoridadeRAC,
            client_id: this.configuracoes.idClienteRAC
          })));
          await this.autenticacao.setShortNameTenant(UrlUtils.GetTenantFromUrl());
        } catch (error) {
          console.error('Error to load auth settings', error);
        }
        resolve(true);
      }, error => {
        console.error('Error to load app settings', error);
        resolve(true);
      });
    });
  }

  dispararEventoIdiomaAlterado(novoIdioma: string) {
    this._eventoIdiomaAlterado.emit(novoIdioma);
  }

  dispararEventoUnidadeAlterada(novaUnidade: Unidade) {
    this.unidadeCorrente = novaUnidade;
    this._eventoUnidadeAlterada.emit(this.unidadeCorrente);
  }

  dispararEventoApresentarMenu(deveApresentar: boolean) {
    this._apresentarMenu = false;
    this._eventoApresentarMenu.emit(deveApresentar);
  }

  getUnidadeAtual(): Unidade {
    return this.unidadeCorrente;
  }

  getUnidadeId(): string {
    return this.unidadeCorrente.id || '';
  }
}
