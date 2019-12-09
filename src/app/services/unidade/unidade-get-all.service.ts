import { AppConfigService } from './../../app-config.service';
import { IUnidade } from './../../entidades/unidade.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IGetAllPagination, IListDto, MappedGetAll, IGetAllService } from 'totvs-log-base-foundation';
import { Unidade } from './../../entidades/unidade.entity';

@Injectable({
  providedIn: 'root'
})
export class UnidadeGetAllService implements IGetAllService<Unidade>, IGetAllPagination<Unidade> {

  private mappedGetAll: MappedGetAll<IUnidade, Unidade>;

  get urlGetAll(): string {
    return `${this.servicoConfiguracao.configuracoes.urlWMS.unidadeQuery}/unidades`;
  }

  get page(): number {
    return this.mappedGetAll.page;
  }

  get pageSize(): number {
    return this.mappedGetAll.pageSize;
  }

  get hasNext(): boolean {
    return this.mappedGetAll.hasNext;
  }

  get items(): Unidade[] {
    return this.mappedGetAll.items;
  }

  constructor(
    private readonly httpClient: HttpClient,
    private servicoConfiguracao: AppConfigService
  ) {
    this.mappedGetAll = new MappedGetAll<IUnidade, Unidade>(
      this.httpClient,
      this.urlGetAll,
      {
        MapTo: (backend: IListDto<IUnidade>) => {
          const listaPaginada: IListDto<Unidade> = {
            hasNext: backend.hasNext,
            items: backend.items.map(item => new Unidade(item))
          };
          return listaPaginada;
        }
      }
    );
  }

  reset(): Observable<Unidade[]> {
    return this.mappedGetAll.reset().pipe(
      catchError(() => of([]))
    );
  }

  more(): Observable<Unidade[]> {
    return this.mappedGetAll.more().pipe(
      catchError(() => of([]))
    );
  }

  getAll(): Observable<Unidade[]> {
    return this.reset();
  }
}
