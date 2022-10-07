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
  @Input() demands!: demand[];

  //Filter
  dateStart!: Date;
  dateEnd!: Date;
  selectedId!: string;
  filterForm!: FormGroup;

  selectedService!: service;
  selectedCollage!: collage;
  constructor(private DemandSer: DemandService, private fb: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      first_Demand_Date: [''],
      last_Demand_Date: [''],
      selectedId: [''],
      selectedNationalId: [''],
      selectedCollage: [''],
      selectedService: ['']
    });
  }

  applyFilter(content: any) {
    this.DemandSer.getSearchDemand(content).subscribe((data) => {
      this.demands = data.Result;
    });
  }

  selectDate(event: any, status: any) {
    switch (status) {
      case 'start':
        break;
      case 'end':
        break;
    }
  }

}
