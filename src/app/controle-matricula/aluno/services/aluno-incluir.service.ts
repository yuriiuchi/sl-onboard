import { Injectable } from '@angular/core';
import { IPostEntity, MappedHttpPostLocation } from 'totvs-log-base-foundation';

import { IAluno } from './../entities/aluno.interface';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';
import { Observable } from 'rxjs';

@Injectable()
export class AlunoIncluirService implements IPostEntity<IAluno, IAluno> {

    private readonly mapped: MappedHttpPostLocation<IAluno, IAluno>;

    constructor(http: HttpClient, private readonly appConfig: AppConfigService) {
        this.mapped = new MappedHttpPostLocation(
            `${this.appConfig.configuracoes.urlWMS.recebimento}/alunos`,
            {
                MapTo: ( turma ) => turma
            },
            http
        );
    }

    Post(data: IAluno): Observable<any> {
        console.log(data);
        return this.mapped.Post(data);
    }
}
