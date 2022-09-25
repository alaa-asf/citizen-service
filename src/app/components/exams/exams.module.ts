import { examsRoutingModule } from './exams-routing.module';
import { sharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { examsComponent } from './exams.component';

@NgModule({
  imports: [
    CommonModule,
    sharedModule,
    examsRoutingModule
  ],
  declarations: [examsComponent]
})
export class examsModule { }
