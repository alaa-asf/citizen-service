import { CollageService } from './../../../shared/services/collage/collage.service';
import { collage } from './../../../model/collage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CollageRecordService } from './../../../shared/services/collage-record/collage-record.service';
import { centerRecord } from './../../../model/centerRecord';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  collageRecordDemand!: centerRecord[];
  demandDetail!: any;
  demandDialog: boolean = false;
  filterForm!: FormGroup;
  collages!: collage[];
  selectedCollage!: collage;
  typeOption = [{ name: 'sent' }, { name: 'recive' }]
  constructor(private CollageRecordSer: CollageRecordService, private fb: FormBuilder, private CollageSer: CollageService) {
    this.filterForm = this.fb.group({
      first_Diwan_Date: [''],
      last_Diwan_Date: [''],
      type: [''],
      collage_FK: ['']
    })
  }
  ngOnInit() {
    this.getDemands();
    this.getCollages();
  }

  showDemandDialog(demandId: any) {
    this.collageRecordDemand.forEach(element => {
      if (element.Demand_FK == demandId) {
        let data = element.Demand;
        this.demandDetail = [data];
      }
    });
    this.demandDialog = true;
  }

  getDemands() {
    this.CollageRecordSer.getAllDemands().subscribe(res => {
      this.collageRecordDemand = res;
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
    const type = this.filterForm.get('type');
    this.filterForm.controls['collage_FK'].setValue(collage?.value.Collage_ID)
    this.filterForm.controls['type'].setValue(type?.value.name)
    this.CollageRecordSer.searchDeamand(this.filterForm.value).subscribe(res => {
      this.collageRecordDemand = res.Result
    })

  }

  getCollages() {
    this.CollageSer.getAllCollages().subscribe((res) => {
      this.collages = res;
    });
  }
}
