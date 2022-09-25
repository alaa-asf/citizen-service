import { studentsAffairsComponent } from './students-affairs.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component:studentsAffairsComponent
    },
    
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class studentsAffairsRoutingModule{}