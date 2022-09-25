import { MessageService } from 'primeng/api';
import { CollageRecordService } from './../../../shared/services/collage-record/collage-record.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { centerRecord } from './../../../model/centerRecord';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-incoming-mail',
  templateUrl: './incoming-mail.component.html',
  styleUrls: ['./incoming-mail.component.css']
})
export class IncomingMailComponent implements OnInit {
  // @Input() collageRecordDemand!: centerRecord[];
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
    this.demandForm.controls['type'].setValue("recive");
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
      const result = res.filter((element:any) => element.Type!="sent");
      this.collageRecordDemand = result;
    })
  }

}
