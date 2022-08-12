import { logInComponent } from './login.component';
import { sharedModule } from './../../shared/shared.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { logInRoutingModule } from "./logInRouting.module";

@NgModule({
declarations:[
    logInComponent
],
imports:[
    CommonModule,
    logInRoutingModule,
    sharedModule
]
})

export class logInModule{}