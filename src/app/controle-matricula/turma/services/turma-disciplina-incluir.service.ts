import { Injectable } from '@angular/core';
import { IPostEntity, MappedHttpPostLocation } from 'totvs-log-base-foundation';

import { ITurma } from './../entities/turma.interface';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';
import { Observable } from 'rxjs';

@Injectable()
export class TurmaDisciplinaIncluirService implements IPostEntity<ITurma, ITurma> {

    private readonly mapped: MappedHttpPostLocation<ITurma, ITurma>;

    constructor(http: HttpClient, private readonly appConfig: AppConfigService) {
        this.mapped = new MappedHttpPostLocation(
            `${this.appConfig.configuracoes.urlWMS.recebimento}/turmas`,
            //`${this.appConfig.configuracoes.urlWMS.recebimento}/turmaDisciplinas`,
            {
                MapTo: ( turma ) => turma
            },
            http
        );
    }

    Post(data: ITurma): Observable<any> {
        return this.mapped.Post(data);
    }
}
