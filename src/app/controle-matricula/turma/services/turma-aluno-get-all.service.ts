import { Injectable } from '@angular/core';
import { IGetEntity, MappedHttpGet, MappedGetAll } from 'totvs-log-base-foundation';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

import { ITurma } from './../entities/turma.interface';
import { TurmaAluno } from './../entities/turma-aluno.entitiy';
import { Turma } from './../entities/turma.entitiy';
import { Observable } from 'rxjs';
import { Aluno } from '../../aluno/entities/aluno.entity';

@Injectable()
export class TurmaAlunoGetAllService implements IGetEntity<Array<Aluno>> {

    private mappedById: MappedHttpGet<ITurma, Array<Aluno>>;
    private mappedGetAll: MappedGetAll<ITurma, Array<Aluno>>;

    constructor(http: HttpClient, private appConfig: AppConfigService) {
        this.mappedById = new MappedHttpGet<ITurma, Array<Aluno>>(
            `${this.appConfig.configuracoes.urlWMS.recebimentoQuery}/turmas/{0}`,
            {
                MapTo: (backend: ITurma) => {
                    return backend.listAlunos;
                }
            },
            http
        );
    }

    private _isLoading = false;

    Get(id: string): Observable<Array<Aluno>> {
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
