import { CollageService } from '../../shared/services/collage/collage.service';
import { collage } from '../../shared/model/collage';
import { FormBuilder, Validators } from '@angular/forms';
import { DemandService } from '../../shared/services/demand/demand.service';
import { demand } from '../../shared/model/demand';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class deliveryComponent implements OnInit {
  demands!: demand[];
  collages!: collage[];
  filterForm!: any;
  typeOption = [{ name: 'sent' }, { name: 'recive' }];
  demandResults = [{ value: 'منفذ' }, { value: 'غير منفذ' }];
  demandStatus = [{ value: 'مسلم' }, { value: 'غير مسلم' }];
  demandDialog: boolean = false;
  demandForm!: any;
  account!: any;
  myDate = new Date();
  selectedDemand!: demand;
  constructor(private DemandSer: DemandService, private fb: FormBuilder, private CollageSer: CollageService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.filterForm = this.fb.group({
      demand_ID: ['']
    });

    this.demandForm = this.fb.group({
      User_Finish_Demand_Note: ['', Validators.required],
      demand_Status: [''],
      user_Finish_Demand_FK: [''],
      user_Finish_Demand_Date: [''],
      demand_ID: [''],
      student_Demand_FK: [''],
      destination_Collage_FK: [''],
      service_FK: [''],

    });
  }

  ngOnInit() {
    this.getDemands();
    this.getCollages();
    let accountDetail: any = localStorage.getItem('account');
    this.account = JSON.parse(accountDetail);

    // console.log('this.account: ', JSON.parse(this.account.User_ID));
  }

  getDemands() {
    this.DemandSer.getAllDemands().subscribe(res => {
      this.demands = res.Result;
    })
  }

  selectDate(event: any, action: any) {
    if (action == 'start') {
      this.filterForm.controls['first_Diwan_Date'].setValue(event)
    } else if (action == 'end') {
      this.filterForm.controls['last_Diwan_Date'].setValue(event)
    }
  }

  trackDemand(data: any) {
    this.DemandSer.trackDemand(this.filterForm.controls['demand_ID'].value).subscribe(res => {
      this.demands = res.Result;
      this.demands = [... this.demands];
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

  // deleteDemand(demand: demand) {
  //   this.confirmationService.confirm({
  //     message: ' هل انت متأكد من حذف طلب' + demand.Demand_ID + '؟',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.DemandSer.deleteDemand(demand.Demand_ID).subscribe(
  //         (res) => {
  //           this.collages = this.collages.filter(
  //             (val) => val.Collage_ID !== demand.Demand_ID
  //           );
  //           // this.collage = {};
  //           this.messageService.add({
  //             severity: 'success',
  //             summary: 'Successful',
  //             detail: 'تم حذف الكلية',
  //             life: 3000,
  //           });
  //         },
  //         (err) => {
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'error',
  //             detail: 'لم يتم حذف الكلية',
  //             life: 3000,
  //           });
  //         }
  //       );
  //     },
  //   });
  // }

  editDemandDialog(demand: demand) {
    this.demandForm.controls.demand_Status.setValue(demand?.demand_Status);
    this.demandForm.controls.User_Finish_Demand_Note.setValue(demand?.User_Finish_Demand_Note);
    this.demandDialog = true;
    this.selectedDemand = demand;
  }

  editDemand(demand: demand) {
    // this.demandForm.controls.user_Finish_Demand_FK.setValue(this.account.User_ID);
    // this.demandForm.controls.user_Finish_Demand_Date.setValue(this.myDate);
    // this.demandForm.controls.demand_ID.setValue(this.selectedDemand.Demand_ID);

    this.selectedDemand.User_Finish_Demand_FK = this.account.User_ID;
    this.selectedDemand.User_Finish_Demand_Date = this.myDate;
    this.selectedDemand.User_Finish_Demand_Note = this.demandForm.controls['User_Finish_Demand_Note'].value;
    this.selectedDemand.demand_Status = this.demandForm.controls['demand_Status'].value;
    this.DemandSer.editDemand(this.selectedDemand.Demand_ID, this.selectedDemand).subscribe(res => {
      console.log(res);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'تم تعديل الطلب',
        life: 3000,
      });
      this.demandDialog = false;
    })
  }
}
