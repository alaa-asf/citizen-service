import { MessageService } from 'primeng/api';
import { CenterRecordService } from './../../../shared/services/center-record/center-record.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { centerRecord } from './../../../model/centerRecord';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-incoming-mail',
  templateUrl: './incoming-mail.component.html',
  styleUrls: ['./incoming-mail.component.css']
})
export class IncomingMailComponent implements OnInit {
  centerRecordDemand!: centerRecord[];
  demandForm!: FormGroup;
  myDate = new Date();
  constructor(private fb: FormBuilder, private CenterRecordSer: CenterRecordService, private messageService: MessageService) {
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
    this.demandForm.controls['type'].setValue("recive");
    this.CenterRecordSer.addDemand(this.demandForm.value).subscribe(res => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'تم اضافة الطلب',
        life: 3000,
      });
      this.getDemands();
    })
  }

  getDemands() {
    this.CenterRecordSer.getAllDemands().subscribe(res => {
      const result = res.filter((element:any) => element.Type!="sent");
      this.centerRecordDemand = result;
    })
  }
}
