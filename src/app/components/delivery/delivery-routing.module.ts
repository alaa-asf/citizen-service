import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { deliveryComponent } from './delivery.component';

const routes: Routes = [
    {
        path: '',
        component:deliveryComponent
    },
    
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class deliveryRoutingModule{}