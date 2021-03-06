import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControleMatriculaComponent } from './controle-matricula.component';
import { TurmaStepComponent } from './turma/turma-step/turma-step.component';
import { ProfessorComponent } from './professor/professor.component';
import { DisciplinaListComponent } from './disciplina/disciplina-list/disciplina-list.component';
import { AlunoListComponent } from './aluno/aluno-list/aluno-list.component';
import { ProfessorListComponent } from './professor/professor-list/professor-list.component';

const routes: Routes = [
    {
        path: '' ,
        component: ControleMatriculaComponent
    },
    {
        path: 'incluir',
        component:  TurmaStepComponent
    },
    {
        path: 'alunos',
        component: AlunoListComponent
    },
    // {
    //     path:  'professores',
    //     component: ProfessorComponent
    // },
    {
        path: 'disciplinas',
        component: DisciplinaListComponent
    },
    {
        path: 'professores',
        component: ProfessorListComponent
    }
];
@NgModule({
    declarations: [

    ],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ControleMatriculaRoutingModule {}
