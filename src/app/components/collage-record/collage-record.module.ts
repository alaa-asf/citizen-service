import { sharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollageRecordComponent } from './collage-record.component';
import { collageRecordRoutingModule } from './collageRecordRouting.module';
import { IncomingMailComponent } from './incoming-mail/incoming-mail.component';
import { OutgoingMailComponent } from './outgoing-mail/outgoing-mail.component';
import { MailComponent } from './mail/mail.component';

@NgModule({
  imports: [
    CommonModule,
    sharedModule,
    collageRecordRoutingModule
  ],
  declarations: [CollageRecordComponent,IncomingMailComponent,OutgoingMailComponent,MailComponent]
})
export class CollageRecordModule { }
