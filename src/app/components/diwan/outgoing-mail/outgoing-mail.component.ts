import { MessageService } from 'primeng/api';
import { CenterRecordService } from './../../../shared/services/center-record/center-record.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { centerRecord } from './../../../model/centerRecord';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-outgoing-mail',
  templateUrl: './outgoing-mail.component.html',
  styleUrls: ['./outgoing-mail.component.css']
})
export class OutgoingMailComponent implements OnInit {
  CenterRecord!: centerRecord[];
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
    this.demandForm.controls['type'].setValue("send");
    this.CenterRecordSer.addDemand(this.demandForm.value).subscribe((res) => {
      if (res.Result == null) {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'لم يتم اضافة الطلب',
          life: 3000,
        });
      } else {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'تم اضافة الطلب',
          life: 3000,
        });
        this.getDemands();
      }

    }, (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'لم يتم اضافة الطلب',
        life: 3000,
      });
    })
  }

  getDemands() {
    this.CenterRecordSer.getAllDemands().subscribe(res => {
      const result = res.filter((element: any) => element.Type != "recive");
      this.CenterRecord = result;
    })
  }
}
