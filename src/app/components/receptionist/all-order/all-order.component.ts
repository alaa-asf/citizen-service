import { collage } from '../../../shared/model/collage';
import { service } from '../../../shared/model/service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { demand } from '../../../shared/model/demand';
import { DemandService } from './../../../shared/services/demand/demand.service';
import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private DemandSer: DemandService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getDemands();
    this.filterForm = this.fb.group({
      first_Demand_Date: [],
      last_Demand_Date: [],
      student_Demand_FK: [],
      service_FK: [],
      destination_Collage_FK: [],
      demand_Status: []
    });
  }

  applyFilter(content: any) {
    this.filterForm.controls.service_FK.setValue(this.selectedService?.Service_ID);
    this.filterForm.controls.destination_Collage_FK.setValue(this.selectedCollage?.Collage_ID);
    this.filterForm.controls.demand_Status.setValue(this.selectedStatus?.option);
    this.DemandSer.getSearchDemand(this.filterForm.value).subscribe((data) => {
      this.demands = data.Result;
    });
  }

  onSearchChange(value: any, action: any) {
    //.target.value
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
  }
}
