import { EstrategiaTentativasRequisicao } from './../../shared/utils/estrategia-tentativas-requisicao.entity';
import { Unidade } from './../../entidades/unidade.entity';
import { Observable, of } from 'rxjs';
import { AppConfigService } from './../../app-config.service';
import { HttpClient } from '@angular/common/http';
import { MappedHttpGet } from 'totvs-log-base-foundation';
import { Injectable } from '@angular/core';
import { catchError, retryWhen } from 'rxjs/operators';
import { IUnidade } from './../../entidades/unidade.interface';
import { ITentativaRequisicao } from './../../shared/utils/tentativa-requisicao.interface';

@Injectable({
  providedIn: 'root'
})
export class UnidadeGetByIdService {

  tentativaRequisicao: ITentativaRequisicao = EstrategiaTentativasRequisicao.tentativaRequisicaoPadrao();

  get url(): string {
    return `${this.servicoConfiguracao.configuracoes.urlWMS.unidadeQuery}/unidades/{0}`;
  }

  private mappedById: MappedHttpGet<IUnidade, Unidade>;

  constructor(
    private httpClient: HttpClient,
    private servicoConfiguracao: AppConfigService
  ) {
    this.mappedById = new MappedHttpGet<IUnidade, Unidade>(
      this.url,
      {
        MapTo: (backend: IUnidade) => new Unidade(backend)
      },
      this.httpClient,
    );
  }

  Get(unidadeId: string): Observable<Unidade> {
    return this.mappedById.Get(unidadeId).pipe(
      retryWhen(EstrategiaTentativasRequisicao.retryWhen(this.tentativaRequisicao)),
      catchError(() => of(undefined))
    );
  }
}
