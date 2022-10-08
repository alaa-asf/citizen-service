import { MessageService } from 'primeng/api';
import { CollageRecordService } from './../../../shared/services/collage-record/collage-record.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { centerRecord } from '../../../shared/model/centerRecord';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-outgoing-mail',
  templateUrl: './outgoing-mail.component.html',
  styleUrls: ['./outgoing-mail.component.css']
})
export class OutgoingMailComponent implements OnInit {
  collageRecordDemand!: centerRecord[];
  demandForm!: FormGroup;
  myDate = new Date();
  constructor(private fb: FormBuilder, private CollageRecordSer: CollageRecordService, private messageService: MessageService) {
    this.demandForm = this.fb.group({
      demand_FK: [''],
      collage_FK: [''],
      type: [''],
      diwan_NO: [''],
      diwan_Date: [''],
      reporter_Name: [''],
    });
  }

  ngOnInit() {
    this.getDemands();
  }

  addDemand(demand: any) {
    this.demandForm.controls['diwan_Date'].setValue(this.myDate);
    this.demandForm.controls['type'].setValue("send");
    // console.log(this.demandForm.value);
    this.CollageRecordSer.addDemand(this.demandForm.value).subscribe(res => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'تم اضافة الكلية',
        life: 3000,
      });
      this.getDemands();
    })
  }

  getDemands() {
    this.CollageRecordSer.getAllDemands().subscribe(res => {
      const result = res.filter((element:any) => element.Type!="recive");
      this.collageRecordDemand = result;
    })
  }
}
