import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IPostEntity, MappedHttpPost } from 'totvs-log-base-foundation';
import { AppConfigService } from '../../../app-config.service';

import { Turma } from './../entities/turma.entitiy';
import { ITurma } from './../entities/turma.interface';
import { TurmaAlterar } from './../entities/turma-alterar.entity';

@Injectable()
export class TurmaAlterarService implements IPostEntity<Turma, ITurma> {

    private readonly mapped: MappedHttpPost<Turma, ITurma, ITurma>;

    constructor(http: HttpClient, private readonly appConfig: AppConfigService) {
        this.mapped = new MappedHttpPost(
            `${this.appConfig.configuracoes.urlWMS.recebimento}/turmas/{0}/alterar`,
            {
                MapTo: ( turma: Turma ) => {
                    return turma;
                }
            },
            http
        );
    }

    Post(data: Turma): Observable<ITurma> {
        return this.mapped.Post(data, data.id);
    }
}
