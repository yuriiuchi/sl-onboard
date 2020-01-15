import { Injectable } from '@angular/core';
import { IGetEntity, MappedHttpGet } from 'totvs-log-base-foundation';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

import { IProfessorGetAll } from './../entities/professor-get-all.interface';
import { Professor } from './../entities/professor.entity';
import { Observable } from 'rxjs';

@Injectable()
export class ProfessorGetByIdService implements IGetEntity<Professor> {

    private mappedById: MappedHttpGet<IProfessorGetAll, Professor>;

    constructor(http: HttpClient, private appConfig: AppConfigService) {
        this.mappedById = new MappedHttpGet<IProfessorGetAll, Professor>(
            `${this.appConfig.configuracoes.urlWMS.recebimentoQuery}/professores/{0}`,
            {
                MapTo: (backend: IProfessorGetAll) => {
                    return Professor.fromDto(backend);
                }
            },
            http
        );
    }

    Get(id: string): Observable<Professor> {
        return this.mappedById.Get(id);
    }
}
