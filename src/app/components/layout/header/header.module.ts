import { sharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    sharedModule
  ],
  declarations: [HeaderComponent],
  exports:[HeaderComponent]
})
export class HeaderModule { }
