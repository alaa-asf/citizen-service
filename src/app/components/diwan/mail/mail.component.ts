import { collage } from '../../../shared/model/collage';
import { CollageService } from './../../../shared/services/collage/collage.service';
import { CenterRecordService } from './../../../shared/services/center-record/center-record.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { demand } from '../../../shared/model/demand';
import { centerRecord } from '../../../shared/model/centerRecord';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  centerRecordDemand!: centerRecord[];
  demandDetail!: any;
  demandDialog: boolean = false;
  filterForm!: FormGroup;
  collages!: collage[];
  typeOption = [{ name: 'صادر' }, { name: 'وارد' }]
  constructor(private fb: FormBuilder, private CenterRecordSer: CenterRecordService, private CollageSer: CollageService) {
    this.filterForm = this.fb.group({
      first_Diwan_Date: [''],
      last_Diwan_Date: [''],
      type: [''],
      collage_FK: [''],
      reporter_Name: [''],
      demand_FK: ['']
    })
  }
  ngOnInit() {
    this.getAllDemands();
    this.getCollages();
  }

  // showDemandDialog(demandId: any) {
  //   this.centerRecordDemand.forEach(element => {
  //     if (element.Demand_FK == demandId) {
  //       let data = element.Demand;
  //       this.demandDetail = [data];
  //     }
  //   });
  //   this.demandDialog = true;
  // }

  // selectDate(event: any, action: any) {
  //   if (action == 'start') {
  //     this.filterForm.controls['first_Diwan_Date'].setValue(event)
  //   } else if (action == 'end') {
  //     this.filterForm.controls['last_Diwan_Date'].setValue(event)
  //   }
  // }

  search(data: any) {
    // const collage = this.filterForm.get('collage_FK');
    // const type = this.filterForm.get('type');
    // // console.log(collage);

    // if (collage?.value != undefined) {
    //   this.filterForm.controls['collage_FK'].setValue(collage?.value.Collage_ID)
    // }
    // this.filterForm.controls['type'].setValue(type?.value.name)
    // console.log(this.filterForm.value);
    
    this.CenterRecordSer.searchDeamand(this.filterForm.value).subscribe(res => {
      this.centerRecordDemand = res.Result
    })

  }

  getCollages() {
    this.CollageSer.getAllCollages().subscribe((res) => {
      this.collages = res;
    });
  }

  getAllDemands() {
    this.CenterRecordSer.getAllDemands().subscribe(res => {
      this.centerRecordDemand = res;
    })
  }

  refresh() {
    this.filterForm.reset();
    this.getAllDemands();
  }
}
