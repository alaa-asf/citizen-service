import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./components/login/login.module').then(m => m.logInModule)
    },
    {
      path: 'main',
      loadChildren: () => import('./components/main/main.module').then(m => m.MainModule)
    },
    { path: '', redirectTo: '', pathMatch: 'full'},
    { path: '**', redirectTo: ''}
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  
  export class AppRoutingModule { }