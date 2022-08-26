import { sharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry.component';

@NgModule({
  imports: [
    CommonModule,
    sharedModule
  ],
  declarations: [EntryComponent]
})
export class EntryModule { }
