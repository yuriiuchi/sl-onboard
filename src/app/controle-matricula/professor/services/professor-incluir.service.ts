import { Injectable } from '@angular/core';
import { IPostEntity, MappedHttpPostLocation } from 'totvs-log-base-foundation';

import { IProfessorGetAll } from './../entities/professor-get-all.interface';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProfessorIncluirService implements IPostEntity<IProfessorGetAll, IProfessorGetAll> {

    private readonly mapped: MappedHttpPostLocation<IProfessorGetAll, IProfessorGetAll>;

    constructor(http: HttpClient, private readonly appConfig: AppConfigService) {
        this.mapped = new MappedHttpPostLocation(
            `${this.appConfig.configuracoes.urlWMS.recebimento}/professores`,
            {
                MapTo: ( turma ) => turma
            },
            http
        );
    }

    Post(data: IProfessorGetAll): Observable<any> {
        console.log(data);
        return this.mapped.Post(data);
    }
}
