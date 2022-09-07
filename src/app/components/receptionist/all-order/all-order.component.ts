import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { demand } from './../../../model/demand';
import { DemandService } from './../../../shared/services/demand/demand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css'],
})
export class AllOrderComponent implements OnInit {
  demands!: demand[];
  //Filter
  dateStart!: Date;
  dateEnd!: Date;
  selectedCollage!: string;
  selectedId!: string;
  selectedService!: string;
  filterForm:FormGroup;
  constructor(private DemandSer: DemandService, private fb: FormBuilder) {
    this.filterForm=this.fb.group({
      dateFrom:[''],
      dateTo:[''],
      collage:[''],
      service:[''],
      id:['']
    })
  }

  ngOnInit() {
    this.DemandSer.getAllDemands().subscribe((data) => {
      // console.log(data);
      this.demands = [data];
    });
  }

  applyFilter(content: any) {
    console.log(content);
  }
}
