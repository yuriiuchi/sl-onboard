import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IPostEntity, MappedHttpPost } from 'totvs-log-base-foundation';
import { AppConfigService } from '../../../app-config.service';

import { Aluno } from './../entities/aluno.entity';
import { IAluno } from './../entities/aluno.interface';

@Injectable()
export class AlunoAlterarService implements IPostEntity<Aluno, IAluno> {

    private readonly mapped: MappedHttpPost<Aluno, IAluno, IAluno>;

    constructor(http: HttpClient, private readonly appConfig: AppConfigService) {
        this.mapped = new MappedHttpPost(
            `${this.appConfig.configuracoes.urlWMS.recebimento}/alunos/{0}/alterar`,
            {
                MapTo: ( turma: Aluno ) => {
                    return turma;
                }
            },
            http
        );
    }

    Post(data: Aluno): Observable<IAluno> {
        return this.mapped.Post(data, data.id);
    }
}
