import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module'
import { PoButtonGroupModule } from '@portinari/portinari-ui';

import { ControleMatriculaComponent } from './controle-matricula.component'
import { ControleMatriculaRoutingModule } from "./controle-matricula-routing.module";
import { TurmaComponent } from './turma/turma/turma.component';
import { TurmaListComponent } from './turma/turma-list/turma-list.component';
import { TurmaGetAllService } from './turma/services/turma-get-all.service';
import { TurmaStepComponent } from './turma/turma-step/turma-step.component';
import { TurmaSimplesComponent } from './turma/turma/turma-simples/turma-simples.component';
import { ProfessorComponent } from './professor/professor.component';
import { AlunoComponent } from './aluno/aluno.component';

@NgModule({
    declarations: [
        ControleMatriculaComponent,
        TurmaComponent,
        TurmaListComponent,
        TurmaComponent,
        TurmaStepComponent,
        TurmaSimplesComponent,
        ProfessorComponent,
        AlunoComponent
    ],
    imports: [
        SharedModule,
        ControleMatriculaRoutingModule,
        PoButtonGroupModule
    ],
    providers: [
        TurmaGetAllService
    ]
})
export class ControleMatriculaModule {}