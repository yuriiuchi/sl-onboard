import { Injectable } from '@angular/core';
import { IGetEntity, MappedHttpGet, MappedGetAll } from 'totvs-log-base-foundation';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

import { ITurma } from './../entities/turma.interface';
import { TurmaDisciplina } from './../entities/turma-disciplina.entitiy';
import { Turma } from './../entities/turma.entitiy';
import { Observable } from 'rxjs';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';

@Injectable()
export class TurmaDisciplinaGetAllService implements IGetEntity<Array<Disciplina>> {

    private mappedById: MappedHttpGet<ITurma, Array<Disciplina>>;
    private mappedGetAll: MappedGetAll<ITurma, Array<Disciplina>>;

    constructor(http: HttpClient, private appConfig: AppConfigService) {
        this.mappedById = new MappedHttpGet<ITurma, Array<Disciplina>>(
            `${this.appConfig.configuracoes.urlWMS.recebimentoQuery}/turmas/{0}`,
            {
                MapTo: (backend: ITurma) => {
                    return backend.listDisciplinas;
                }
            },
            http
        );
    }

    private _isLoading = false;

    Get(id: string): Observable<Array<Disciplina>> {
        return this.mappedById.Get(id);
    }

    public get isLoading(): boolean {
    return this._isLoading;
    }

    // reset(): Observable<TurmaDisciplina[]> {
    //     this._isLoading = true;
    //     return this.mappedById.reset().pipe(
    //         finalize(() => this._isLoading = false)
    //     );
    // }
}
