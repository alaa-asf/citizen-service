import { SideBarModule } from './../layout/side-bar/side-bar.module';
import { CollageManagementComponent } from './collage-management/collage-management.component';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { sharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { adminRoutingModule } from './adminRouting.module';
import { changeNamePipe } from 'src/app/shared/pipes/changeName.pipe';

@NgModule({
  imports: [
    CommonModule,
    sharedModule,
    adminRoutingModule,
    SideBarModule
  ],
  declarations: [AdminComponent, UserManagementComponent, ServiceManagementComponent, CollageManagementComponent, changeNamePipe]
})
export class AdminModule { }
