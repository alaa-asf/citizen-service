import { DemandService } from './../../shared/services/demand/demand.service';
import { demand } from './../../model/demand';
import { service } from './../../model/service';
import { collage } from './../../model/collage';
import { StudentServiceService } from './../../shared/services/student-service/student-service.service';
import { CollageService } from './../../shared/services/collage/collage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css']
})
export class ReceptionistComponent implements OnInit {
  collages!: collage[];
  services!: service[];
  demands!: demand[];
  constructor(private CollageSer: CollageService, private StudentServiceSer: StudentServiceService, private DemandSer: DemandService) { }

  ngOnInit() {
    this.getCollages();
    this.getServices();
  }

  getCollages() {
    this.CollageSer.getAllCollages().subscribe((res) => {
      this.collages = res;
    });
  }

  getServices() {
    this.StudentServiceSer.getAllServices().subscribe((res) => {
      this.services = res.Result;
    });
  }

  getDemands() {
    this.DemandSer.getAllDemands().subscribe((data) => {
      this.demands = data.Result;
    });
  }

  onChange(event: any) {
    if (event) {
      this.getDemands();
    }
  }
}
