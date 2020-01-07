import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module'
import { PoButtonGroupModule } from '@portinari/portinari-ui';

import { ControleMatriculaComponent } from './controle-matricula.component'
import { ControleMatriculaRoutingModule } from './controle-matricula-routing.module';
import { TurmaComponent } from './turma/turma/turma.component';
import { TurmaListComponent } from './turma/turma-list/turma-list.component';
import { TurmaListFormComponent } from './turma/turma-list/turma-list-form.component';
import { TurmaGetAllService } from './turma/services/turma-get-all.service';
import { TurmaStepComponent } from './turma/turma-step/turma-step.component';
import { TurmaSimplesComponent } from './turma/turma/turma-simples/turma-simples.component';
import { ProfessorComponent } from './professor/professor.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AlunoListComponent } from './aluno/aluno-list/aluno-list.component';
import { AlunoGetAllService } from './aluno/services/aluno-get-all.service';
import { DisciplinaListComponent } from './disciplina/disciplina-list/disciplina-list.component';
import { DisciplinaListFormComponent } from './disciplina/disciplina-list/disciplina-list-form.component';
import { DisciplinaGetAllService } from './disciplina/services/disciplina-get-all.service';
import { TurmaGetByIdService } from './turma/services/turma-get-by-id.service';
import { TurmaIncluirService } from '../controle-matricula/turma/services/turma-incluir.service';
import { TurmaAlterarService } from '../controle-matricula/turma/services/turma-alterar.service';
import { TurmaDisciplinaIncluirComponent } from '../controle-matricula/turma/turma-disciplina/turma-disciplina-incluir.component';

@NgModule({
    declarations: [
        ControleMatriculaComponent,
        TurmaComponent,
        TurmaListComponent,
        TurmaListFormComponent,
        TurmaComponent,
        TurmaStepComponent,
        TurmaSimplesComponent,
        ProfessorComponent,
        AlunoComponent,
        AlunoListComponent,
        TurmaListComponent,
        DisciplinaListComponent,
        TurmaDisciplinaIncluirComponent,
        DisciplinaListFormComponent
    ],
    imports: [
        SharedModule,
        ControleMatriculaRoutingModule,
        PoButtonGroupModule
    ],
    providers: [
        TurmaGetAllService,
        AlunoGetAllService,
        DisciplinaGetAllService,
        TurmaGetByIdService,
        TurmaIncluirService,
        TurmaAlterarService
    ]
})
export class ControleMatriculaModule {}
