import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module'
import { PoButtonGroupModule } from '@portinari/portinari-ui';

import { ControleMatriculaComponent } from './controle-matricula.component';
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
import { AlunoAlterarService } from './aluno/services/aluno-alterar.service';
import { AlunoIncluirService } from './aluno/services/aluno-incluir.service';
import { DisciplinaListComponent } from './disciplina/disciplina-list/disciplina-list.component';
import { DisciplinaListFormComponent } from './disciplina/disciplina-list/disciplina-list-form.component';
import { DisciplinaGetAllService } from './disciplina/services/disciplina-get-all.service';
import { TurmaGetByIdService } from './turma/services/turma-get-by-id.service';
import { TurmaIncluirService } from '../controle-matricula/turma/services/turma-incluir.service';
import { TurmaAlterarService } from '../controle-matricula/turma/services/turma-alterar.service';
import { TurmaDisciplinaIncluirComponent } from '../controle-matricula/turma/turma-disciplina/turma-disciplina-incluir.component';
import { TurmaDisciplinaGetAllService } from './turma/services/turma-disciplina-get-all.service';
import { TurmaDisciplinaListFormComponent } from './turma/turma-disciplina/turma-disciplina-list-form.component';
import { TurmaDisciplinaIncluirService } from './turma/services/turma-disciplina-incluir.service';
import { TurmaDisciplinaAlterarService } from './turma/services/turma-disciplina-alterar.service';
import { TurmaAlunoListFormComponent } from './turma/turma-aluno/turma-aluno-list-form.component';
import { TurmaAlunoIncluirComponent } from './turma/turma-aluno/turma-aluno-incluir.component';
import { TurmaAlunoAlterarService } from './turma/services/turma-aluno-alterar.service';
import { TurmaAlunoGetAllService } from './turma/services/turma-aluno-get-all.service';
import { TurmaAlunoIncluirService } from './turma/services/turma-aluno-incluir.service';
import { AlunoListFormComponent } from './aluno/aluno-list/aluno-list-form.component';
import { DisciplinaIncluirFormComponent } from './disciplina/disciplina-incluir-form/disciplina-incluir-form.component';
import { DisciplinaIncluirComponent } from './disciplina/disciplina-incluir/disciplina-incluir.component';
import { DisciplinaIncluirService } from './disciplina/services/disciplina-incluir.service';
import { DisciplinaAlterarService } from './disciplina/services/disciplina-alterar.service';
import { DisciplinaGetByIdService } from './disciplina/services/disciplina-get-by-id.service';
import { AlunoGetByIdService } from './aluno/services/aluno-get-by-id.service';
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
        DisciplinaListFormComponent,
        TurmaDisciplinaListFormComponent,
        TurmaAlunoListFormComponent,
        TurmaAlunoIncluirComponent,
        AlunoListFormComponent,
        DisciplinaIncluirFormComponent,
        DisciplinaIncluirComponent
    ],
    imports: [
        SharedModule,
        ControleMatriculaRoutingModule,
        PoButtonGroupModule
    ],
    providers: [
        TurmaGetAllService,
        DisciplinaGetAllService,
        TurmaGetByIdService,
        TurmaIncluirService,
        TurmaAlterarService,
        TurmaDisciplinaGetAllService,
        TurmaDisciplinaIncluirService,
        TurmaDisciplinaAlterarService,
        TurmaAlunoAlterarService,
        TurmaAlunoGetAllService,
        TurmaAlunoIncluirService,
        DisciplinaIncluirService,
        DisciplinaAlterarService,
        DisciplinaGetByIdService,
        AlunoGetAllService,
        AlunoAlterarService,
        AlunoIncluirService,
        AlunoGetByIdService
    ]
})
export class ControleMatriculaModule {}
