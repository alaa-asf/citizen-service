import { CollageService } from '../../shared/services/collage/collage.service';
import { collage } from '../../shared/model/collage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DemandService } from '../../shared/services/demand/demand.service';
import { demand } from '../../shared/model/demand';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class deliveryComponent implements OnInit {
  demands!:demand[];
  collages!:collage[];
  filterForm!:FormGroup;
  typeOption = [{ name: 'sent' }, { name: 'recive' }]
  constructor(private DemandSer:DemandService,private fb:FormBuilder,private CollageSer:CollageService) {
    this.filterForm = this.fb.group({
      first_Demand_Date: [''],
      last_Demand_Date: [''],
      demand_Status: [''],
      demand_Result: [''],
      destination_Collage_FK:[''],
      demand_ID:[''],
      demand_Barcode:['']
    })
  }

  ngOnInit() {
    this.getDemands();
    this.getCollages();
  }

  getDemands(){
    this.DemandSer.getAllDemands().subscribe(res =>{
      this.demands=res.Result;
      // console.log(res.Result);
      
    })
  }

  selectDate(event: any, action: any) {
    if (action == 'start') {
      this.filterForm.controls['first_Diwan_Date'].setValue(event)
    } else if (action == 'end') {
      this.filterForm.controls['last_Diwan_Date'].setValue(event)
    }
  }

  search(data: any) {
    const collage = this.filterForm.get('collage_FK');
    // console.log(collage);
    
    if (collage?.value != undefined) {
      this.filterForm.controls['collage_FK'].setValue(collage?.value.Collage_ID)
    }
    this.DemandSer.getSearchDemand(this.filterForm.value).subscribe(res => {
      this.demands = res.Result
    })

  }

  getCollages() {
    this.CollageSer.getAllCollages().subscribe((res) => {
      this.collages = res;
    });
  }

  refresh() {
    this.filterForm.reset();
    this.getDemands();
  }
}
