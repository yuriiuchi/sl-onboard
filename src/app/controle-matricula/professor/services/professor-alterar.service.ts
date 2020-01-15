import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IPostEntity, MappedHttpPost } from 'totvs-log-base-foundation';
import { AppConfigService } from '../../../app-config.service';

import { Professor } from './../entities/professor.entity';
import { IProfessorGetAll } from './../entities/professor-get-all.interface';

@Injectable()
export class ProfessorAlterarService implements IPostEntity<IProfessorGetAll, IProfessorGetAll> {

    private readonly mapped: MappedHttpPost<Professor, IProfessorGetAll, IProfessorGetAll>;

    constructor(http: HttpClient, private readonly appConfig: AppConfigService) {
        this.mapped = new MappedHttpPost(
            `${this.appConfig.configuracoes.urlWMS.recebimento}/professores/{0}/alterar`,
            {
                MapTo: ( turma: Professor ) => {
                    return turma;
                }
            },
            http
        );
    }

    Post(data: Professor): Observable<IProfessorGetAll> {
        return this.mapped.Post(data, data.id);
    }
}
