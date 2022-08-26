import { Account } from './../../model/account';
import { ConfirmationService, MessageService } from 'primeng/api';
import { accountManagementService } from './../../shared/services/account-management/account-management.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  account!: Account;
  accounts!: Account[];
  submitted!: boolean;
  accountDialog!: boolean;
  selectedAccounts!: Account[];
  constructor(
    private accountManagementSer: accountManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllAccounts();
  }

  getAllAccounts() {
    this.accountManagementSer.getAllAccount().subscribe((data) => {
      this.accounts = data;
    });
  }

  newAccount() {
    this.account = {};
    this.submitted = false;
    this.accountDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من حذف الحسابات المحددة ؟',
      header: 'تأكيد عملية الحذف',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accounts = this.accounts.filter(
          (val) => !this.selectedAccounts.includes(val)
        );
        this.selectedAccounts = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  saveAccount() {
    this.submitted = true;

    if (
      this.account?.User_First_FirstName?.trim() &&
      this.account?.User_First_LastName?.trim()
    ) {
      if (this.account.User_ID) {
        this.accounts[this.findIndexById(this.account.User_ID)] = this.account;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'تم تحديث محتويات الحساب',
          life: 3000,
        });
      } else {
        // this.account.User_ID = this.createId();
        this.accounts.push(this.account);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'تم اضافة الحساب',
          life: 3000,
        });
      }

      this.accounts = [...this.accounts];
      this.accountDialog = false;
      this.account = {};
    }
  }

  hideDialog() {
    this.accountDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i]?.User_ID === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  deleteAccount(account: Account) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من حذف ' + account.User_Name + '؟',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
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
    });
  }

  editAccount(account: Account) {
    this.account = {...account};
    this.accountDialog = true;
  }
}
