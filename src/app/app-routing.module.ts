import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthCallbackComponent } from 'totvs-log-web-foundation';
import { AddCommandDirective } from '@progress/kendo-angular-grid';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'controle-matricula',
    loadChildren: () => import('./controle-matricula/controle-matricula.module').then(m => m.ControleMatriculaModule)
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, {
    enableTracing: false,
    relativeLinkResolution: 'corrected'
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
