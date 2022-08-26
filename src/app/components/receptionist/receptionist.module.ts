import { AllOrderComponent } from './all-order/all-order.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { sharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionistComponent } from './receptionist.component';
import { ReceptionistRoutingModule } from './receptionistRouting.module';

@NgModule({
  imports: [
    CommonModule,
    sharedModule,
    ReceptionistRoutingModule
  ],
  declarations: [ReceptionistComponent,NewOrderComponent,AllOrderComponent]
})
export class ReceptionistModule { }
