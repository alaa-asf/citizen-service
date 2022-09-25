import { CollageService } from './../../../shared/services/collage/collage.service';
import { collage } from './../../../model/collage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-collage-management',
  templateUrl: './collage-management.component.html',
  styleUrls: ['./collage-management.component.css']
})
export class CollageManagementComponent implements OnInit {
  collage!: collage;
  collages!: collage[];
  collageDialog!: boolean;
  collageForm!: FormGroup;
  newAccountButton!: boolean;
  editAccountButton!: boolean;
  options=["Yes","No"]
  constructor(
    private fb: FormBuilder,
    private CollageSer: CollageService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.collageForm = this.fb.group({
      Collage_ID: [''],
      Collage_Name: ['', [Validators.required]],
      Execution_Period_Duration: ['', [Validators.required]],
      Is_Automated_Work: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.getAllCollages();
  }

  getAllCollages() {
    this.CollageSer.getAllCollages().subscribe((data) => {
      this.collages = data;
    });
  }

  openNewCollageDialog(action: any) {
    if ((action = 'newCollage')) {
      this.newAccountButton = true;
      this.editAccountButton = false;
      this.collageDialog = true;
      this.collage = {};
      this.collageForm.reset();
    } else {
      this.editAccountButton = true;
      this.newAccountButton = false;
      this.collageDialog = true;
    }
  }

  addCollage(collage: any) {
    if(collage.Is_Automated_Work == "Yes")
      collage.Is_Automated_Work=true;
    else if (collage.Is_Automated_Work == "No")
      collage.Is_Automated_Work=false;
    this.CollageSer.addCollage(collage).subscribe((res) => {
      this.collages.push(collage);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'تم اضافة الكلية',
        life: 3000,
      });
      this.collageDialog = false;
      this.getAllCollages();
    });
  }


  hideDialog() {
    this.collageDialog = false;
  }

  deleteCollage(collage: collage) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من حذف ' + collage.Collage_Name + '؟',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.CollageSer.deleteCollage(collage.Collage_ID).subscribe(
          (res) => {
            this.collages = this.collages.filter(
              (val) => val.Collage_ID !== collage.Collage_ID
            );
            this.collage = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'تم حذف الكلية',
              life: 3000,
            });
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'لم يتم حذف الكلية',
              life: 3000,
            });
          }
        );
      },
    });
  }

  editCollage(collage: any) {
    if(collage.Is_Automated_Work == "Yes")
      collage.Is_Automated_Work=true;
    else if (collage.Is_Automated_Work == "No")
      collage.Is_Automated_Work=false;
    this.CollageSer.editCollage(collage.Collage_ID, collage).subscribe((res) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'تم تعديل الكلية',
        life: 3000,
      });
      this.collageDialog = false;
      this.getAllCollages();
    });
  }

  editAccountDialog(collage: collage) {
    this.collageDialog = true;
    this.editAccountButton = true;
    this.newAccountButton = false;
    this.collages.forEach((element) => {
      if (element.Collage_ID == collage.Collage_ID) {
        this.collageForm.controls['Collage_Name'].setValue(collage.Collage_Name);
        this.collageForm.controls['Execution_Period_Duration'].setValue(collage.Execution_Period_Duration);
        this.collageForm.controls['Is_Automated_Work'].setValue(collage.Is_Automated_Work);
        this.collageForm.controls['Collage_ID'].setValue(collage.Collage_ID);
      }
    });
  }
}
