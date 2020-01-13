// import { Injectable } from "@angular/core";
// import { IGetEntity } from "totvs-log-base-foundation";

// @Injectable()
// export class DisciplinaGetByIdService {} //implements IGetEntity<Disciplina> {

// }

import { Injectable } from '@angular/core';
import { IGetEntity, MappedHttpGet } from 'totvs-log-base-foundation';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../app-config.service';

import { IDisciplinaGetAll } from './../entities/disciplina-get-all.interface';
import { Disciplina } from './../entities/disciplina.entity';
import { Observable } from 'rxjs';

@Injectable()
export class DisciplinaGetByIdService implements IGetEntity<Disciplina> {

    private mappedById: MappedHttpGet<IDisciplinaGetAll, Disciplina>;

    constructor(http: HttpClient, private appConfig: AppConfigService) {
        this.mappedById = new MappedHttpGet<IDisciplinaGetAll, Disciplina>(
            `${this.appConfig.configuracoes.urlWMS.recebimentoQuery}/turmas/{0}`,
            {
                MapTo: (backend: IDisciplinaGetAll) => {
                    return Disciplina.fromDto(backend);
                }
            },
            http
        );
    }

    Get(id: string): Observable<Disciplina> {
        return this.mappedById.Get(id);
    }
}
