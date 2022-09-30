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
      path: 'students-affairs',
      loadChildren: () => import('./components/students-affairs/students-affairs.module').then(m => m.studentsAffairsModule)
    },
    {
      path: 'diwan',
      loadChildren: () => import('./components/diwan/diwan.module').then(m => m.DiwanModule)
    },
    {
      path: 'admin',
      loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
    },
    {
      path: 'exams',
      loadChildren: () => import('./components/exams/exams.module').then(m => m.examsModule)
    },
    {
      path: 'delivery',
      loadChildren: () => import('./components/delivery/delivery.module').then(m => m.deliveryModule)
    },
    {
      path:'collage-record',
      loadChildren: () => import('./components/collage-record/collage-record.module').then(m => m.CollageRecordModule)
    },
    { path: '', redirectTo: '', pathMatch: 'full'},
    { path: '**', redirectTo: ''}
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  
  export class AppRoutingModule { }