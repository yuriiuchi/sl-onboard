// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { IPostEntity, MappedHttpPostLocation } from 'totvs-log-base-foundation';
// import { AppConfigService } from '../../app-config.service';
// import { Turma } from './../../controle-matricula/turma/entities/turma.entitiy';

// @Injectable()
// export class TurmaIncluirServiceOld implements IPostEntity<Turma, string> {

//   get url(): string {
//     return `${this.servicoConfiguracao.configuracoes.urlWMS.recebimentoQuery}/turmas`;
//   }

//   private mapped: MappedHttpPostLocation<Turma, string>;

//   constructor(
//     httpClient: HttpClient,
//     private readonly servicoConfiguracao: AppConfigService
//   ) {
//     this.mapped = new MappedHttpPostLocation(
//       this.url,
//       {
//         MapTo: (turma) => {
//           return turma;
//         },
//       },
//       httpClient
//     );
//   }

//   Post(turmaIncluir: Turma): Observable<string> {
//     return this.mapped.Post(turmaIncluir);
//   }
// }
