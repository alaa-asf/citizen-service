import { accountManagementService } from './../../shared/services/account-management/account-management.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class logInComponent implements OnInit {
  showSpinner: boolean = false;
  showLogInForm: boolean = true;
  errorLogIn: boolean = false;
  errorconn: boolean = false;
  account: any;
  userForm;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountManagementSer: accountManagementService
  ) {
    this.userForm = this.fb.group({
      user_Name: ['', Validators.required],
      user_Password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // this.getAllAccounts();
  }

  logIn(accountInfo: any) {
    this.showLogInForm = false;
    this.showSpinner = true;
    this.accountManagementSer.logIn(accountInfo).subscribe(
      (res) => {
        this.account=res.Result;
        if (res?.Result != null) {
          console.log('in if');
          let accountrole = this.account.User_Type;
          console.log(accountrole);
          switch (accountrole) {
            case 'admin':
              this.router.navigate(['admin']);
              break;
            case 'Receptionist':
              this.router.navigate(['receptionist']);
              break;
            case 'Entry':
              this.router.navigate(['entry']);
              break;
            case 'diwan':
              this.router.navigate(['diwan']);
              break;
            default:
              this.router.navigate(['']);
              break;
          }
        } else {
          this.showLogInForm = true;
          this.showSpinner = false;
          this.errorLogIn = true;
        }
      },
      (err) => {
        this.showLogInForm = true;
        this.showSpinner = false;
        this.errorconn = true;
      }
    );
    // this.showLogInForm = false;
    // this.showSpinner = true;
    // this.router.navigate(['main']);
  }

  // getAllAccounts() {
  //   this.accountManagementSer.getAllAccount().subscribe((data) => {
  //     this.account = data;
  //   });
  // }
}
