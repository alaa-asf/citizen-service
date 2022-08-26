import { ReceptionistComponent } from './receptionist.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component:ReceptionistComponent
    },
    
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReceptionistRoutingModule{}