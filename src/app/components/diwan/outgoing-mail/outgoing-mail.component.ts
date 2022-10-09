import { MessageService } from 'primeng/api';
import { CenterRecordService } from './../../../shared/services/center-record/center-record.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { centerRecord } from '../../../shared/model/centerRecord';
import { Component, Input, OnInit } from '@angular/core';
import { postalReporter } from 'src/app/shared/model/postalReporter';
import { PostalReporterService } from 'src/app/shared/services/postal-reporter/postal-reporter.service';
import { studentDemandService } from 'src/app/shared/services/student-demand/student-demand.service';
import { studentDemand } from 'src/app/shared/model/studentDemand';

@Component({
  selector: 'app-outgoing-mail',
  templateUrl: './outgoing-mail.component.html',
  styleUrls: ['./outgoing-mail.component.css']
})
export class OutgoingMailComponent implements OnInit {
  centerRecordDemand!: centerRecord[];
  demandForm!: any;
  myDate = new Date();
  reporters!: postalReporter[];
  selectedReporter!: postalReporter;
  studientDemands!: studentDemand[];
  constructor(private fb: FormBuilder, private CenterRecordSer: CenterRecordService, private messageService: MessageService, private PostalReporterSer: PostalReporterService, private studentDemandSer: studentDemandService) {
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
    this.getPostalReporter();
    this.getStudientDemands();
    this.centerRecordDemand = [];
  }

  addDemand(demand: any) {
    this.demandForm.controls['diwan_Date'].setValue(this.myDate);
    this.demandForm.controls['type'].setValue("صادر");
    this.demandForm.controls['reporter_Name'].setValue(this.selectedReporter.PostalReporter_Name);
    this.studientDemands.forEach(element => {
      if (element.Student_Demand_ID == demand.demand_FK) {
        this.demandForm.controls.collage_FK.setValue(element.Collage_FK);
      }
    });
    this.centerRecordDemand.push(this.demandForm.value);
    this.centerRecordDemand = [...this.centerRecordDemand];
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'تم اضافة الطلب',
      life: 3000,
    });
    this.newDemand();
  }



  getPostalReporter() {
    this.PostalReporterSer.getAllReporter().subscribe((res: any) => {
      this.reporters = res;
    })
  }

  newDemand() {
    this.demandForm.reset();
    this.selectedReporter = {};
  }

  deleteDemand(demand: any) {
    const index = this.centerRecordDemand.indexOf(demand);
    if (index !== -1) {
      this.centerRecordDemand.splice(index, 1);
    }
  }

  addAllDemands() {
    // this.CenterRecordSer.addDemand(this.demandForm.value).subscribe((res) => {
    //   if (res.Result == null) {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'error',
    //       detail: 'لم يتم اضافة الطلب',
    //       life: 3000,
    //     });
    //   } else {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'تم اضافة الطلب',
    //       life: 3000,
    //     });
    //     this.getDemands();
    //   }

    // }, (err) => {
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'error',
    //     detail: 'لم يتم اضافة الطلب',
    //     life: 3000,
    //   });
    // })

    this.centerRecordDemand.forEach(element => {
      this.CenterRecordSer.addDemand(element).subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'تم اضافة الطلب',
          life: 3000,
        });
      })
    });
    this.centerRecordDemand = [];
    this.centerRecordDemand = [...this.centerRecordDemand];
  }

  getStudientDemands() {
    this.studentDemandSer.getAll().subscribe(res => {
      this.studientDemands = res;
    })
  }
}
