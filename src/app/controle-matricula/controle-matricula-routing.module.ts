import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ControleMatriculaComponent } from "./controle-matricula.component";
import { TurmaStepComponent } from './turma/turma-step/turma-step.component';

const routes: Routes = [
    { 
        path: '' ,
        component: ControleMatriculaComponent
    },
    {
        path: 'incluir',
        component:  TurmaStepComponent
    }
    // {
    //     path: 'turma',
    //     loadChildren: () => import('./turma/turma.module').then(m => m.TurmaModule)
    // }
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