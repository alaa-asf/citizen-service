import { studentsAffairsRoutingModule } from './students-affairs-routing.module';
import { sharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentsAffairsComponent } from './students-affairs.component';

@NgModule({
  imports: [
    CommonModule,
    sharedModule,
    studentsAffairsRoutingModule
  ],
  declarations: [studentsAffairsComponent]
})
export class studentsAffairsModule { }
