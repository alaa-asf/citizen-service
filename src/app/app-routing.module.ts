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
    {
      path: 'receptionist',
      loadChildren: () => import('./components/receptionist/receptionist.module').then(m => m.ReceptionistModule)
    },
    {
      path: 'entry',
      loadChildren: () => import('./components/entry/entry.module').then(m => m.EntryModule)
    },
    {
      path: 'diwan',
      loadChildren: () => import('./components/diwan/diwan.module').then(m => m.DiwanModule)
    },
    {
      path: 'admin',
      loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
    },
    { path: '', redirectTo: '', pathMatch: 'full'},
    { path: '**', redirectTo: ''}
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  
  export class AppRoutingModule { }