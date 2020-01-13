import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IPostEntity, MappedHttpPost } from 'totvs-log-base-foundation';
import { AppConfigService } from '../../../app-config.service';

import { Disciplina } from './../entities/disciplina.entity';
import { IDisciplinaGetAll } from './../entities/disciplina-get-all.interface';

@Injectable()
export class DisciplinaAlterarService implements IPostEntity<Disciplina, IDisciplinaGetAll> {

    private readonly mapped: MappedHttpPost<Disciplina, IDisciplinaGetAll, IDisciplinaGetAll>;

    constructor(http: HttpClient, private readonly appConfig: AppConfigService) {
        this.mapped = new MappedHttpPost(
            `${this.appConfig.configuracoes.urlWMS.recebimento}/disciplinas/{0}/alterar`,
            {
                MapTo: ( disciplina: Disciplina ) => {
                    return disciplina;
                }
            },
            http
        );
    }

    Post(data: Disciplina): Observable<IDisciplinaGetAll> {
        return this.mapped.Post(data, data.id);
    }
}
