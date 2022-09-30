import { deliveryRoutingModule } from './delivery-routing.module';
import { sharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { deliveryComponent } from './delivery.component';

@NgModule({
  imports: [
    CommonModule,
    sharedModule,
    deliveryRoutingModule
  ],
  declarations: [deliveryComponent]
})
export class deliveryModule { }
