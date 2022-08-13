import { sharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar.component';

@NgModule({
  imports: [
    CommonModule,
    sharedModule
  ],
  declarations: [SideBarComponent],
  exports:[SideBarComponent]
})
export class SideBarModule { }
