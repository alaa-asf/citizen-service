import { CollageService } from './../../../shared/services/collage/collage.service';
import { collage } from '../../../shared/model/collage';
import { accountManagementService } from './../../../shared/services/account-management/account-management.service';
import { Account } from '../../../shared/model/account';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  account!: Account;
  accounts!: Account[];
  accountDialog!: boolean;
  newAccountButton!: boolean;
  editAccountButton!: boolean;
  userForm!: FormGroup;
  collages!: collage[];
  selectedCollage!: collage;
  collageDisabled: boolean = false;
  usersType = [{ name: 'ادمن', value: 'admin' }, { name: 'موظف استقبال', value: 'receptionist' }, { name: 'موظف تسليم', value: 'delivery' }, { name: 'ديوان مركز خدمة', value: 'diwan' }, { name: 'ديوان كلية', value: 'collage-record' }, { name: 'شؤون طلاب', value: 'students-affairs' }, { name: 'امتحانات', value: 'exams' }]
  selectedUser!: any;
  selectedUserCheck: boolean = false;
  constructor(
    private fb: FormBuilder,
    private accountManagementSer: accountManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private CollageSer: CollageService
  ) {
    this.userForm = this.fb.group({
      User_Name: ['', [Validators.required]],
      User_Password: ['', [Validators.required]],
      User_First_FirstName: ['', [Validators.required]],
      User_First_LastName: ['', [Validators.required]],
      Collage_FK: [''],
      User_Type: [''],
      User_ID: ['']
    });
  }

  ngOnInit() {
    this.getAllAccounts();
    this.getCollages();
  }

  getAllAccounts() {
    this.accountManagementSer.getAllAccount().subscribe((data) => {
      this.accounts = data;
    });
  }

  openNewAccountDialog(action: any) {
    if ((action = 'newAccount')) {
      this.newAccountButton = true;
      this.editAccountButton = false;
      this.accountDialog = true;
      this.userForm.reset();
      this.selectedUser = '';
    } else {
      this.editAccountButton = true;
      this.newAccountButton = false;
      this.accountDialog = true;
    }

  }

  addAccount(account: any) {
    this.userForm.controls['Collage_FK'].setValue(this.selectedCollage?.Collage_ID);
    this.userForm.controls['User_Type'].setValue(this.selectedUser);
    this.accountManagementSer.checkAccount(this.userForm.value).subscribe(res => {
      if (res.Result) {
        console.log("in if ", res.Result);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'اسم المستخدم مكرر',
          life: 3000,
        });
      } else {
        this.accountManagementSer.addAccount(this.userForm.value).subscribe((res) => {
          this.accounts.push(this.userForm.value);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'تم اضافة الحساب',
            life: 3000,
          });
          this.accountDialog = false;
        });
      }
    })
  }

  hideDialog() {
    this.accountDialog = false;
  }

  deleteAccount(account: Account) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من حذف ' + account.User_Name + '؟',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountManagementSer.deleteAccount(account.User_ID).subscribe(
          (res) => {
            this.accounts = this.accounts.filter(
              (val) => val.User_ID !== account.User_ID
            );
            this.account = {};
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

  editAccount(account: Account) {
    this.userForm.controls['User_Type'].setValue(account.User_Type);
    this.accountManagementSer.checkAccount(this.userForm.value).subscribe(res => {
      if (res.Result && account.User_Name == this.userForm.value.User_Name) {
        console.log("in if ", res.Result);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'اسم المستخدم مكرر',
          life: 3000,
        });
      } else {
        this.accountManagementSer.editAccount(account.User_ID, this.userForm.value).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'تم تعديل الحساب',
            life: 3000,
          });
          this.accountDialog = false;
          this.getAllAccounts();
        });
      }
    })
  }

  editAccountDialog(account: Account) {
    this.accountDialog = true;
    this.editAccountButton = true;
    this.newAccountButton = false;
    this.accounts.forEach((element) => {
      if (element.User_ID == account.User_ID) {
        this.userForm.controls['User_Name'].setValue(account.User_Name);
        this.userForm.controls['Collage_FK'].setValue(account.Collage_FK);
        this.userForm.controls['User_First_FirstName'].setValue(account.User_First_FirstName);
        this.userForm.controls['User_First_LastName'].setValue(account.User_First_LastName);
        this.userForm.controls['User_Password'].setValue(account.User_Password);
        // this.userForm.controls['User_Type'].setValue(this.selectedUser);
        this.selectedUser = account.User_Type;
        this.userForm.controls['User_ID'].setValue(account.User_ID);
      }
    });
  }

  getCollages() {
    this.CollageSer.getAllCollages().subscribe((res) => {
      this.collages = res;
    });
  }

  checkUserType(event: any) {
    this.selectedUserCheck = true;
    let role = event.value;
    switch (role) {
      case 'admin':
      case 'receptionist':
      case 'delivery':
      case 'diwan':
        this.collageDisabled = true;
        this.userForm.controls['Collage_FK'].setValue(null);
        this.userForm.controls['User_Type'].setValue(role);
        break;
      default:
        this.collageDisabled = false;
        break;
    }
  }
}
