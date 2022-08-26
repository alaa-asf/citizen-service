import { FormBuilder, Validators } from '@angular/forms';
import { StudentServiceService } from './../../../shared/services/student-service/student-service.service';
import { service } from './../../../model/service';
import { CollageService } from './../../../shared/services/collage/collage.service';
import { collage } from './../../../model/collage';
import { studentDemandService } from './../../../shared/services/student-demand/student-demand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent implements OnInit {
  isNew: boolean = false;

  collages!: collage[];
  selectedCollage!: collage;

  services!: service[];
  selectedService!: service;

  studentDemandForm: any;

  constructor(
    private studentDemandSer: studentDemandService,
    private CollageSer: CollageService,
    private StudentServiceSer: StudentServiceService,
    private fb: FormBuilder
  ) {
    this.getCollages();
    this.getServices();
    this.studentDemandForm = this.fb.group({
      student_Demand_ID: ['', Validators.required],
      student_Demand_FirstName: ['', Validators.required],
      student_Demand_LastName: ['', Validators.required],
      student_Demand_National_ID: ['', Validators.required],
      student_Demand_Univercity_Number: ['', Validators.required],
      collage_FK: ['', Validators.required],
      collage: {
        collage_ID: ['', Validators.required],
        collage_Name: ['', Validators.required],
        is_Automated_Work: ['', Validators.required],
        execution_Period_Duration: ['', Validators.required],
      },
    });
  }

  ngOnInit() {}

  changeNationalID(event: any) {
    let id = {
      student_Demand_National_ID: event.target.value,
    };
    console.log(id);
    
    if (event.target.value) {
      this.studentDemandSer.checkNationalID(id).subscribe((res) => {
        console.log(res);
        
        if (res.Result != null) {
          console.log(res);
          //here update input with response
          this.isNew = false;
        } else {
          this.isNew = true;
        }
      });
    }
  }

  getCollages() {
    this.CollageSer.getAllCollages().subscribe((res) => {
      console.log(res);
      this.collages = res;
    });
  }

  getServices() {
    this.StudentServiceSer.getAllServices().subscribe((res) => {
      console.log(res);
      this.services = res;
    });
  }
}
