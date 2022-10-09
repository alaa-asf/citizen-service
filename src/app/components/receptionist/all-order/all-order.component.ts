import { collage } from '../../../shared/model/collage';
import { service } from '../../../shared/model/service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { demand } from '../../../shared/model/demand';
import { DemandService } from './../../../shared/services/demand/demand.service';
import { Component, Input, OnInit } from '@angular/core';
import { studentDemandService } from 'src/app/shared/services/student-demand/student-demand.service';
import { studentDemand } from 'src/app/shared/model/studentDemand';
// import * as moment from 'moment';
@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css'],
})
export class AllOrderComponent implements OnInit {
  @Input() collages!: collage[];
  @Input() services!: service[];
  demands!: demand[];

  //Filter
  dateStart!: Date;
  dateEnd!: Date;
  selectedId!: string;
  filterForm!: any;

  selectedService!: service;
  selectedCollage!: collage;
  demandStatus = [{ option: 'مسلم', value: 'ok' }, { option: 'غير مسلم', value: 'notOk' }];
  selectedStatus!: any;
  nationalID: any;
  univercityNumber: any;
  studientDemands!: studentDemand[];
  constructor(private DemandSer: DemandService, private fb: FormBuilder, private studentDemandSer: studentDemandService) {
    this.filterForm = this.fb.group({
      first_Demand_Date: [],
      last_Demand_Date: [],
      student_Demand_FK: [],
      service_FK: [''],
      destination_Collage_FK: [''],
      demand_Status: ['']
    });
  }

  ngOnInit() {
    this.getDemands();
    this.getStudientDemands();
  }

  applyFilter(content: any) {
    if (this.filterForm.get("service_FK")?.value == '')
      this.filterForm.controls.service_FK.setValue(null);
    else
      this.filterForm.controls.service_FK.setValue(this.selectedService?.Service_ID);

    if (this.filterForm.get("destination_Collage_FK")?.value == '')
      this.filterForm.controls.destination_Collage_FK.setValue(null);
    else
      this.filterForm.controls.destination_Collage_FK.setValue(this.selectedCollage?.Collage_ID);

    if (this.filterForm.get("demand_Status")?.value == '')
      this.filterForm.controls.demand_Status.setValue(null);
    else
      this.filterForm.controls.demand_Status.setValue(this.selectedStatus?.option);
      
    this.DemandSer.getSearchDemand(this.filterForm.value).subscribe((data) => {
      this.demands = data.Result;
    });
  }

  onSearchChange(value: any, action: any) {
    if (action == 'Student_Demand_National_ID') {
      this.studientDemands.forEach(element => {
        if (element.Student_Demand_National_ID == value.target.value) {
          this.filterForm.controls.student_Demand_FK.setValue(element.Student_Demand_ID);
        }
      });
    }
    else {
      this.studientDemands.forEach(element => {
        if (element.Student_Demand_Univercity_Number == value.target.value)
          this.filterForm.controls.student_Demand_FK.setValue(element.Student_Demand_ID)
      });
    }
  }

  getDemands() {
    this.DemandSer.getAllDemands().subscribe((data) => {
      this.demands = data.Result;
    });
  }

  clearFilter() {
    this.filterForm.reset();
    this.selectedService = {};
    this.selectedCollage = {};
    this.selectedStatus = {};
    this.getDemands();
    this.nationalID = '';
    this.univercityNumber = '';
  }

  getStudientDemands() {
    this.studentDemandSer.getAll().subscribe(res => {
      this.studientDemands = res;
    })
  }
}
