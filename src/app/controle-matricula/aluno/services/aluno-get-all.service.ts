import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IGetAllPagination, MappedGetAll, IListDto, ApiQueryString, QueryFilter, FieldValue } from 'totvs-log-base-foundation';
import { AppConfigService } from './../../../../app/app-config.service';
import { Aluno } from './../entities/aluno.entity';
import { IAlunoGetAll } from './../entities/aluno-get-all.interface';

@Injectable()
export class AlunoGetAllService implements IGetAllPagination<Aluno> {

    private mappedGetAll: MappedGetAll<IAlunoGetAll, Aluno>;

    constructor(
        private http: HttpClient,
        private appConfig: AppConfigService
    ) {
        this.mappedGetAll = new MappedGetAll<IAlunoGetAll, Aluno>(
            this.http,
            `${this.appConfig.configuracoes.urlWMS.recebimentoQuery}/alunos`,
            {
                MapTo: (backend: IListDto<IAlunoGetAll>) => {
                            // const listaPaginada = {
                            //     hasNext: backend.hasNext,
                            //     items: backend.items.map( x => Turma.fromDto(x))
                            // }
                            // return listaPaginada;
                            return backend;
                        }
            }
        );
    }

    get page(): number {
        return this.mappedGetAll.page;
    }

    get pageSize(): number {
    return this.mappedGetAll.pageSize;
    }
    set pageSize(_pageSize: number) {
    this.mappedGetAll.pageSize = _pageSize;
    }

    get hasNext(): boolean {
    return this.mappedGetAll.hasNext;
    }

    get items(): Aluno[] {
    return this.mappedGetAll.items;
    }

    private _isLoading = false;
    public get isLoading(): boolean {
    return this._isLoading;
    }

    more(): Observable<Aluno[]> {
    this._isLoading = true;
    return this.mappedGetAll.more().pipe(
        finalize(() => this._isLoading = false)
    );
    }

    getAll(): Observable<Aluno[]> {
    this._isLoading = true;
    return this.mappedGetAll.getAll().pipe(
        finalize(() => this._isLoading = false)
    );
    }

    reset(): Observable<Aluno[]> {
    this._isLoading = true;
    return this.mappedGetAll.reset().pipe(
        finalize(() => this._isLoading = false)
    );
    }

    getAllSemPaginacao(): Observable<Aluno[]> {
    const queryFilter = new QueryFilter();
    const apiQueryString = new ApiQueryString({
        page: 1,
        pageSize: undefined,
        query: queryFilter
    });
    this._isLoading = true;
    return this.mappedGetAll.reset(apiQueryString).pipe(
        finalize(() => this._isLoading = false)
    );
    }

    setQueryFilter(queryFilter: QueryFilter): void {
    if (queryFilter && queryFilter !== null) {
        queryFilter.add(this.filtroUnidadeId());
    } else {
        queryFilter = QueryFilter.Build(this.filtroUnidadeId());
    }
    this.mappedGetAll.setQueryFilter(queryFilter);
    }

    private filtroUnidadeId(): FieldValue {
    return new FieldValue('unidadeId', this.appConfig.getUnidadeAtual().id);
    }
}
