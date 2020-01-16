import { Injectable } from '@angular/core';
import { IPostEntity, MappedHttpPostLocation } from 'totvs-log-base-foundation';

import { IDisciplinaGetAll } from './../entities/disciplina-get-all.interface';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';
import { Observable } from 'rxjs';

@Injectable()
export class DisciplinaIncluirService implements IPostEntity<IDisciplinaGetAll, IDisciplinaGetAll> {

    private readonly mapped: MappedHttpPostLocation<IDisciplinaGetAll, IDisciplinaGetAll>;

    constructor(http: HttpClient, private readonly appConfig: AppConfigService) {
        this.mapped = new MappedHttpPostLocation(
            `${this.appConfig.configuracoes.urlWMS.recebimento}/disciplinas`,
            {
                MapTo: ( disciplina ) => disciplina
            },
            http
        );
    }

    Post(data: IDisciplinaGetAll): Observable<any> {
        return this.mapped.Post(data);
    }
}
