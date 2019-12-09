import { UnidadeEstoque } from './../../entidades/unidade-estoque.entity';
import { IUnidadeEstoque } from './../../entidades/unidade-estoque.interface';
import { Observable } from 'rxjs';
import { AppConfigService } from './../../app-config.service';
import { HttpClient } from '@angular/common/http';
import { MappedHttpGet } from 'totvs-log-base-foundation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnidadeEstoqueGetByIdService {

  get url(): string {
    return `${this.servicoConfiguracao.configuracoes.urlWMS.estoqueQuery}/unidades/{0}`;
  }

  private mappedById: MappedHttpGet<IUnidadeEstoque, UnidadeEstoque>;

  constructor(
    private httpClient: HttpClient,
    private servicoConfiguracao: AppConfigService
  ) {

    this.mappedById = new MappedHttpGet<IUnidadeEstoque, UnidadeEstoque>(
      this.url,
      {
        MapTo: (backend: IUnidadeEstoque) => new UnidadeEstoque(backend)
      },
      this.httpClient,
    );
  }

  Get(unidadeId: string): Observable<UnidadeEstoque> {
    return this.mappedById.Get(unidadeId);
  }
}
