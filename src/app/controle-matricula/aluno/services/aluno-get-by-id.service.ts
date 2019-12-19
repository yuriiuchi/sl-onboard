import { IGetEntity, MappedHttpGet } from 'totvs-log-base-foundation';

import { IAluno } from './../entities/aluno.interface';
import { Aluno } from './../entities/aluno.entity';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AlunoGetByIdService implements IGetEntity<Aluno> {

    private mappedById: MappedHttpGet<IAluno, Aluno>;

    get url(): string {
        return `${this.servicoConfiguracao.configuracoes.urlWMS.expedicaoQuery}/alunos/{0}`;
    }

    constructor(private http: HttpClient, private servicoConfiguracao: AppConfigService) {
        this.mappedById = new MappedHttpGet<IAluno, Aluno>(
            this.url,
            {
                MapTo: (backend: IAluno) => {
                    return Aluno.fromDto(backend);
                }
            },
            this.http
        );
    }

    Get(id: string): Observable<Aluno> {
        return this.mappedById.Get(id);
    }
}
