import { Injectable } from '@angular/core';
import { IGetEntity, MappedHttpGet } from 'totvs-log-base-foundation';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

import { ITurma } from './../entities/turma.interface';
import { Turma } from './../entities/turma.entitiy';
import { Observable } from 'rxjs';

@Injectable()
export class TurmaGetByIdService implements IGetEntity<Turma> {

    private mappedById: MappedHttpGet<ITurma, Turma>;

    constructor(http: HttpClient, private appConfig: AppConfigService) {
        this.mappedById = new MappedHttpGet<ITurma, Turma>(
            `${this.appConfig.configuracoes.urlWMS.recebimentoQuery}/turmas/{0}`,
            {
                MapTo: (backend: ITurma) => {
                    return Turma.fromDto(backend);
                }
            },
            http
        );
    }

    Get(id: string): Observable<Turma> {
        return this.mappedById.Get(id);
    }
}
