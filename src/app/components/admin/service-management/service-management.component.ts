import { DocumentRequired } from '../../../shared/model/documentRequired';
import { StudentServiceService } from './../../../shared/services/student-service/student-service.service';
import { service } from '../../../shared/model/service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {
  service!: service;
  services!: service[];
  serviceRequireds!: DocumentRequired[];
  serviceRequired!: DocumentRequired;
  serviceDialog!: boolean;
  newServiceButton!: boolean;
  editServiceButton!: boolean;
  serviceForm!: FormGroup;
  service_Document_Requireds!: FormGroup;
  values: String[] = [];

  constructor(
    private fb: FormBuilder,
    private StudentServiceSer: StudentServiceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.serviceForm = this.fb.group({
      Service_Name: ['', [Validators.required]],
      service_Document_Requireds: this.fb.group({
        Service_FK: [''],
        document_Required_Service_Name: ['', [Validators.required]],
      })
    });
  }

  ngOnInit() {
    this.getAllServices();
  }

  getAllServices() {
    this.StudentServiceSer.getAllServices().subscribe((data) => {
      this.services = data.Result;
    });
  }

  getAllRequired(serviceId: any) {
    this.StudentServiceSer.getDocumentRequire(serviceId).subscribe(res => {
      this.serviceRequireds = res;
    })
  }

  openNewServiceDialog(action: any) {
    if ((action = 'newService')) {
      this.serviceForm.reset();
      this.newServiceButton = true;
      this.editServiceButton = false;
      this.serviceDialog = true;
    } else {
      this.editServiceButton = true;
      this.newServiceButton = false;
      this.serviceDialog = true;
    }

  }

  addService(service: any) {
    // console.log(service);
    this.StudentServiceSer.checkService(service).subscribe(res => {
      if (res.Result) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'اسم الخدمة مكرر',
          life: 3000,
        });
      } else {
        this.StudentServiceSer.addService(service).subscribe((res) => {
          //   console.log(res);
          // this.StudentServiceSer.addDocumentRequire(requireDocument).subscribe(res => {
          //   console.log(res);

          // })
          this.services.push(service);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'تم اضافة الخدمة',
            life: 3000,
          });
          this.serviceDialog = false;
          this.getAllServices();
        });
      }
    })


    // console.log(service);
    // service.Service_Document_Requireds.forEach(element => {
    //   this.newServiceRequired.Document_Required_Service_Name=element
    //   this.newService.Service_Document_Requireds.push()
    // });
    // {
    //   "service_Name": "test",
    //   "service_Document_Requireds": [
    //     {
    //       "document_Required_Service_Name": "id"
    //     },
    //     {
    //       "document_Required_Service_Name": "photo"
    //     },
    //     {
    //       "document_Required_Service_Name": "iddd"
    //     }
    //   ]
    // }

    // let addedService!: service;
    // addedService.Service_Name = service.Service_Name;
    // if(service.Service_Document_Requireds)
    // for (let index = 0; index < service.Service_Document_Requireds.length; index++) {
    //   //       requireDocument[index].Service_Document_Requireds['Document_Required_Service_Name'] = service.Service_Document_Requireds[index]
    // if(addedService.Service_Document_Requireds)
    //   addedService.Service_Document_Requireds[index]=service.Service_Document_Requireds[index];
    // }
    // let requireDocument: { document_Required_Service_Name: string }[];
    // addedService.Service_Document_Requireds = requireDocument;
    // console.log(addedService);

    //   if(service.Service_Document_Requireds){
    //     for (let index = 0; index < service.Service_Document_Requireds.length; index++) {
    //       requireDocument[index].Service_Document_Requireds['Document_Required_Service_Name'] = service.Service_Document_Requireds[index]
    //     }
    //   }

    //     let addedService={
    //       Service_Name:service.Service_Name,
    //       Service_Document_Requireds:requireDocument
    //     }

    // if(service.Service_Document_Requireds){
    //   for (let index = 0; index < service.Service_Document_Requireds.length; index++) {
    //     service!.Service_Document_Requireds[index]!.Service_FK=service?.Service_ID;
    //     service?.Service_Document_Requireds[index]?.Document_Required_Service_Name=this.values[index]
    //   }
    // }
    //  
  }

  hideDialog() {
    this.serviceDialog = false;
  }

  deleteService(service: service) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من حذف ' + service.Service_Name + '؟',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.StudentServiceSer.deleteServices(service.Service_ID).subscribe(
          (res) => {
            this.services = this.services.filter(
              (val) => val.Service_ID !== service.Service_ID
            );
            this.service = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'تم حذف الخدمة',
              life: 3000,
            });
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'لم يتم حذف الخدمة',
              life: 3000,
            });
          }
        );
      },
    });
  }

  editService(service: service) {
    this.StudentServiceSer.editServices(service.Service_ID, service).subscribe((res) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'تم تعديل الخدمة',
        life: 3000,
      });
      this.serviceDialog = false;
      this.getAllServices();
    });
  }

  editServiceDialog(service: service) {
    // console.log(service);
    
    this.serviceDialog = true;
    this.editServiceButton = true;
    this.newServiceButton = false;

    this.services.forEach((element) => {
      if (element.Service_ID == service.Service_ID) {
        // console.log(element);

        this.serviceForm.patchValue({
          Service_Name: service.Service_Name,
          Service_ID: service.Service_ID,
          service_Document_Requireds: [service.Service_Document_Requireds]

          // address: {
          //   street: '123 Drew Street'
          // }
        });
        // console.log(this.serviceForm.value);
        
        // this.serviceForm.controls['Service_Name'].setValue(service.Service_Name);
        // this.serviceForm.controls['Service_ID'].setValue(service.Service_ID);
        // let documents: any = [];
        // if (service.Service_Document_Requireds) {
        //   service.Service_Document_Requireds.forEach(element => {
        //     documents.push(element.Document_Required_Service_Name)
        //   });
        // }
        // this.serviceRequiredForm.controls['serviceRequiredForm'].setValue(service.Service_Document_Requireds  )
      }
    });
  }

}
