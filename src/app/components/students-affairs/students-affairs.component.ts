import { CollageService } from '../../shared/services/collage/collage.service';
import { collage } from '../../shared/model/collage';
import { FormBuilder, Validators } from '@angular/forms';
import { DemandService } from '../../shared/services/demand/demand.service';
import { demand } from '../../shared/model/demand';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-students-affairs',
  templateUrl: './students-affairs.component.html',
  styleUrls: ['./students-affairs.component.css']
})
export class studentsAffairsComponent implements OnInit {
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
      first_Demand_Date: [''],
      last_Demand_Date: [''],
      demand_Status: [''],
      demand_Result: [''],
      destination_Collage_FK: [''],
      demand_ID: [''],
      demand_Barcode: ['']
    });

    this.demandForm = this.fb.group({
      User_Finish_Demand_Note: ['', Validators.required],
      demand_Result: [''],
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

  search(data: any) {
    if (this.filterForm.get("demand_Barcode")?.value == '')
      this.filterForm.controls.demand_Barcode.setValue(null);

    if (this.filterForm.get("demand_ID")?.value == '')
      this.filterForm.controls.demand_ID.setValue(null);

    if (this.filterForm.get("demand_Result")?.value == '')
      this.filterForm.controls.demand_Result.setValue(null);

    if (this.filterForm.get("demand_Status")?.value == '')
      this.filterForm.controls.demand_Status.setValue(null);

    if (this.filterForm.get("first_Demand_Date")?.value == '')
      this.filterForm.controls.first_Demand_Date.setValue(null);

    if (this.filterForm.get("last_Demand_Date")?.value == '')
      this.filterForm.controls.last_Demand_Date.setValue(null);
    // console.log(data);
    // console.log();

    const collage = this.filterForm.get('destination_Collage_FK');
    // console.log(collage);

    if (collage?.value != undefined) {
      this.filterForm.controls['destination_Collage_FK'].setValue(collage?.value.Collage_ID)
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
    this.demandForm.controls.demand_Result.setValue(demand?.Demand_Result);
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
    this.selectedDemand.Demand_Result = this.demandForm.controls['demand_Result'].value;
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
