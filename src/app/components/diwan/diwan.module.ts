import { sharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiwanComponent } from './diwan.component';

@NgModule({
  imports: [
    CommonModule,
    sharedModule
  ],
  declarations: [DiwanComponent]
})
export class DiwanModule { }
