import { accountManagementService } from './../../../shared/services/account-management/account-management.service';
import { Account } from './../../../model/account';
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

  constructor(
    private fb: FormBuilder,
    private accountManagementSer: accountManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.userForm = this.fb.group({
      User_Name: ['', [Validators.required]],
      User_Password: ['', [Validators.required]],
      User_First_FirstName: ['', [Validators.required]],
      User_First_LastName: ['', [Validators.required]],
      Collage_FK: [''],
      User_Type: ['', [Validators.required]],
      User_ID: ['']
    });
  }

  ngOnInit() {
    this.getAllAccounts();
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
    } else {
      this.editAccountButton = true;
      this.newAccountButton = false;
      this.accountDialog = true;
    }

  }

  addAccount(account: any) {
    this.accountManagementSer.addAccount(account).subscribe((res) => {
      this.accounts.push(account);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'تم اضافة الحساب',
        life: 3000,
      });
      this.accountDialog = false;
    });
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
    this.accountManagementSer.editAccount(account.User_ID, account).subscribe((res) => {
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
        this.userForm.controls['User_Type'].setValue(account.User_Type);
        this.userForm.controls['User_ID'].setValue(account.User_ID);
      }
    });
  }

}
