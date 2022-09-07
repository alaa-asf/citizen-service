import { OutgoingMailComponent } from './outgoing-mail/outgoing-mail.component';
import { IncomingMailComponent } from './incoming-mail/incoming-mail.component';
import { MailComponent } from './mail/mail.component';
import { diwanRoutingModule } from './diwanRouting.module';
import { sharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiwanComponent } from './diwan.component';

@NgModule({
  imports: [
    CommonModule,
    sharedModule,
    diwanRoutingModule
  ],
  declarations: [DiwanComponent,MailComponent,IncomingMailComponent,OutgoingMailComponent]
})
export class DiwanModule { }
