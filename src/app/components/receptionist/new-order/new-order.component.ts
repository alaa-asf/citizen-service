import { DemandService } from './../../../shared/services/demand/demand.service';
import { demand } from './../../../model/demand';
import { studentDemand } from '../../../model/studentDemand';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentServiceService } from './../../../shared/services/student-service/student-service.service';
import { service } from '../../../model/service';
import { collage } from '../../../model/collage';
import { studentDemandService } from './../../../shared/services/student-demand/student-demand.service';
import { Component, Input, OnInit } from '@angular/core';
import { DocumentRequired } from 'src/app/model/documentRequired';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent implements OnInit {

  //collages
  @Input() collages!: collage[];
  selectedCollage!: collage;
  //services
  @Input() services!: service[];
  selectedService!: service;
  DocumentRequired!: DocumentRequired[];

  //check if student is new
  isNew: boolean = false;

  //agency or not
  isAgency: boolean = false;
  options = [{ name: 'المقدم نفسه' }, { name: 'وكالة' }];

  studentDemandForm: any;
  demandForm: any;
  studentDemand: studentDemand = {};
  demand: demand = {};
  myDate = new Date();
  constructor(
    private studentDemandSer: studentDemandService,
    private StudentServiceSer: StudentServiceService,
    private DemandSer: DemandService,
    private fb: FormBuilder,
  ) {
    this.studentDemandForm = this.fb.group({
      student_Demand_FirstName: ['', Validators.required],
      student_Demand_LastName: ['', Validators.required],
      student_Demand_National_ID: ['', Validators.required],
      student_Demand_Univercity_Number: ['', Validators.required],
      collage_FK: [''],
    });

    this.demandForm = this.fb.group({
      Student_Demand_FK: [''],
      demand_Date: [''],
      demand_Barcode: [''],
      demand_Status: [''],
      demand_Result: [''],
      demand_Applicant_Type: [''],
      agency_Source: [''],
      agency_No: [''],
      agency_Date: [''],
      destination_Collage_FK: [''],
      service_FK: [''],
    })
  }
  ngOnInit() {


  }

  changeNationalID(event: any) {
    let id = {
      student_Demand_National_ID: event.target.value,
    };

    if (event.target.value) {
      this.studentDemandSer.checkNationalID(id).subscribe((res) => {
        if (
          res.Result != null &&
          id.student_Demand_National_ID ==
          res.Result[0].Student_Demand_National_ID
        ) {
          //old student
          this.isNew = false;
          this.studentDemandForm.controls.student_Demand_National_ID.setValue(
            res.Result[0].Student_Demand_National_ID
          );
          this.studentDemandForm.controls.student_Demand_FirstName.setValue(
            res.Result[0].Student_Demand_FirstName
          );
          this.studentDemandForm.controls.student_Demand_LastName.setValue(
            res.Result[0].Student_Demand_LastName
          );
          this.studentDemandForm.controls.student_Demand_Univercity_Number.setValue(res.Result[0].Student_Demand_Univercity_Number);
          this.selectedCollage = res.Result[0].Collage;
          this.studentDemandForm.controls.collage_FK.setValue(this.selectedCollage.Collage_ID);

        } else {
          this.isNew = true;

          // this.studentDemandForm.controls.student_Demand_Univercity_Number.setValue(null);
          // this.studentDemandForm.controls.collage.setValue(null);
          // this.studentDemandForm.controls.collage_FK.setValue(this.selectedCollage.Collage_ID);
        }
      });
    }
  }

  addDemand(studentDemand: any) {
    this.studentDemandSer.addStudentDemand(studentDemand).subscribe((res) => {
      this.demandForm.controls.Student_Demand_FK.setValue(res.Result.Student_Demand_ID);
      this.demandForm.controls.demand_Date.setValue(this.myDate);
      this.demandForm.controls.demand_Status.setValue('جديد');
      this.demandForm.controls.demand_Result.setValue('لم يتم');
      this.demandForm.controls.destination_Collage_FK.setValue(res.Result.Collage_FK);
      this.demandForm.controls.service_FK.setValue(this.selectedService.Service_ID);

      this.DemandSer.addDemand(this.demandForm.value).subscribe(res => {
        // this.DemandSer.getAllDemands().subscribe((data) => {
        //   this.demands = data.Result;
        // });
      })
    });
  }

  onChangeAgency(value: any) {
    if (value.value.name == 'وكالة') {
      this.isAgency = true;
      this.demandForm.controls.demand_Applicant_Type.setValue('وكالة')
    } else {
      this.isAgency = false;
      this.demandForm.controls.demand_Applicant_Type.setValue('صاحب العلاقة نفسه')
      this.demandForm.controls.agency_No.setValue(null);
      this.demandForm.controls.agency_Date.setValue(null);
      this.demandForm.controls.agency_Source.setValue(null);
    }
  }

  onChangeService(serviceId: any) {
    this.StudentServiceSer.getDocumentRequire(
      serviceId.value.Service_ID
    ).subscribe((res) => {
      this.DocumentRequired = res.Result;
    });
  }
}
