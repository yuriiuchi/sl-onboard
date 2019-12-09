import { AppConfigService } from '../../app-config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  MappedGetAll,
  QueryFilter,
  IGetAllPagination,
  IGetAllService,
  IGetAllQueryFilter
} from 'totvs-log-base-foundation';
import { catchError, map } from 'rxjs/operators';
import { PoComboOption, PoComboFilter } from '@portinari/portinari-ui';
import { IUnidadeMedida } from './../../../app/entities/unidade-medida/unidade-medida.interface';

@Injectable()
export class UnidadeMedidaGetAllService implements
  IGetAllQueryFilter,
  PoComboFilter,
  IGetAllService<IUnidadeMedida>,
  IGetAllPagination<IUnidadeMedida> {

  private mappedGetAll: MappedGetAll<IUnidadeMedida, IUnidadeMedida>;

  constructor(
    private httpClient: HttpClient,
    private servicoConfiguracao: AppConfigService) {
    this.mappedGetAll = new MappedGetAll<IUnidadeMedida, IUnidadeMedida>(
      this.httpClient,
      this.urlGetAll,
      {
        MapTo: (backend: any) => {
          return backend;
        }
      }
    );
  }

  get urlGetAll(): string {
    return `${this.servicoConfiguracao.configuracoes.urlWMS.estoqueQuery}/produtos/unidadesMedida`;
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

  get items(): IUnidadeMedida[] {
    return this.mappedGetAll.items;
  }

  getAll(): Observable<IUnidadeMedida[]> {
    return this.mappedGetAll.getAll().pipe(
      catchError(() => of([])),
    );
  }

  reset(): Observable<IUnidadeMedida[]> {
    return this.mappedGetAll.reset().pipe(
      catchError(() => of([])),
    );
  }

  more(): Observable<Array<IUnidadeMedida>> {
    return this.mappedGetAll.more().pipe(
      catchError(() => of(this.mappedGetAll.items)));
  }

  setQueryFilter(queryFilter: QueryFilter): void {
    this.mappedGetAll.setQueryFilter(queryFilter);
  }

  getFilteredData(param: {property: string, value: string}): Observable<PoComboOption[]> {
    if (param.value && param.value !== '') {
      this.setQueryFilter(QueryFilter.Build(
        { field: 'codigo', value: param.value }
      ));
    } else {
      this.setQueryFilter(undefined);
    }

    return this.reset()
      .pipe(
        map(unidadesMedida => {
          const comboOptions = [];
          unidadesMedida.forEach(
            (unidadeMedida) => {
              comboOptions.push(this.convertToThfComboOption(unidadeMedida.codigo));
            }
          );
          return comboOptions;
        })
      );
  }

  getObjectByValue(value: any): Observable < PoComboOption > {
    return of(this.convertToThfComboOption(value));
  }

  private convertToThfComboOption(value: any): PoComboOption {
    return { value, label: value };
  }

}
