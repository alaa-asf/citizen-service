import { CollageService } from '../../../shared/services/collage/collage.service';
import { collage } from '../../../shared/model/collage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { postalReporter } from 'src/app/shared/model/postalReporter';
import { PostalReporterService } from 'src/app/shared/services/postal-reporter/postal-reporter.service';

@Component({
  selector: 'app-reporter-management',
  templateUrl: './reporter-management.component.html',
  styleUrls: ['./reporter-management.component.css']
})

export class ReporterManagementComponent implements OnInit {
  reporter!: postalReporter;
  reporters!: postalReporter[];
  reporterDialog!: boolean;
  newReporterButton!: boolean;
  editReporterButton!: boolean;
  reporterForm!: FormGroup;
  collages!: collage[];
  selectedCollage!: collage;
  constructor(
    private fb: FormBuilder,
    private PostalReporterSer: PostalReporterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private CollageSer: CollageService
  ) {
    this.reporterForm = this.fb.group({
      PostalReporter_Name: ['', [Validators.required]],
      collage_FK: [''],
    });
  }

  ngOnInit() {
    this.getAllReporters();
    this.getCollages();
  }

  getAllReporters() {
    this.PostalReporterSer.getAllReporter().subscribe((data: any) => {
      this.reporters = data;
    });
  }

  openNewReporterDialog(action: any) {
    if ((action = 'newReporter')) {
      this.newReporterButton = true;
      this.editReporterButton = false;
      this.reporterDialog = true;
      this.reporterForm.reset();
      this.selectedCollage = {};
    } else {
      this.editReporterButton = true;
      this.newReporterButton = false;
      this.reporterDialog = true;
    }

  }

  addReporter(reporter: postalReporter) {
    this.reporterForm.controls['collage_FK'].setValue(reporter?.Collage_FK);
    this.PostalReporterSer.checkReporter(this.reporterForm.value).subscribe(res => {
      if (res.Result) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'اسم المستخدم مكرر',
          life: 3000,
        });
      } else {
        this.PostalReporterSer.addReporter(this.reporterForm.value).subscribe((res) => {
          this.getAllReporters();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'تم اضافة الحساب',
            life: 3000,
          });
          this.reporterDialog = false;
        });
      }
    })
  }

  hideDialog() {
    this.reporterDialog = false;
  }

  deleteReporter(reporter: postalReporter) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من حذف ' + reporter.PostalReporter_Name + '؟',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.PostalReporterSer.deleteReporter(reporter.PostalReporter_ID).subscribe(
          (res) => {
            this.reporters = this.reporters.filter(
              (val) => val.PostalReporter_ID !== reporter.PostalReporter_ID
            );
            this.reporter = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'تم حذف الحساب',
              life: 3000,
            });
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'لم يتم حذف الحساب',
              life: 3000,
            });
          }
        );
      },
    });
  }

  editReporter(reporter: postalReporter) {
    this.reporterForm.controls['collage_FK'].setValue(reporter?.Collage_FK);
    this.PostalReporterSer.checkReporter(this.reporterForm.value).subscribe(res => {
      if (res.Result) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'اسم المستخدم مكرر',
          life: 3000,
        });
      } else {
        this.PostalReporterSer.editReporter(reporter.PostalReporter_ID, reporter).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'تم تعديل الحساب',
            life: 3000,
          });
          this.reporterDialog = false;
          this.getAllReporters();
        });
      }
    })
  }

  editReporterDialog(reporter: postalReporter) {
    this.reporterDialog = true;
    this.editReporterButton = true;
    this.newReporterButton = false;
    this.reporters.forEach((element: any) => {
      if (element.PostalReporter_ID == reporter.PostalReporter_ID) {
        this.reporterForm.controls['PostalReporter_Name'].setValue(reporter?.PostalReporter_Name);
        this.reporterForm.controls['collage_FK'].setValue(reporter?.Collage_FK);
        let collage: any;
        if (reporter.Collage)
          collage = reporter.Collage;
        this.selectedCollage = collage;
      }
    });
  }

  getCollages() {
    this.CollageSer.getAllCollages().subscribe((res) => {
      this.collages = res;
    });
  }

}
