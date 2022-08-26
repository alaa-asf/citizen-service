import { sharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { adminRoutingModule } from './adminRouting.module';

@NgModule({
  imports: [
    CommonModule,
    sharedModule,
    adminRoutingModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
