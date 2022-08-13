import { HeaderModule } from './../layout/header/header.module';
import { mainRoutingModule } from './mainRouting.module';
import { SideBarComponent } from './../layout/side-bar/side-bar.component';
import { sharedModule } from './../../shared/shared.module';
import { SideBarModule } from './../layout/side-bar/side-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    HeaderModule,
    SideBarModule,
    CommonModule,
    sharedModule,
    mainRoutingModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
