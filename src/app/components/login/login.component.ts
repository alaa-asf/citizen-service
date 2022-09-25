import { accountManagementService } from './../../shared/services/account-management/account-management.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';

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
  account?: Account;
  userForm;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountManagementSer: accountManagementService
  ) {
    this.userForm = this.fb.group({
      user_Name: ['', Validators.required],
      user_Password: ['', Validators.required],
      user_First_FirstName: '',
      user_First_LastName: '',
      collage_FK: 0,
      user_Type: '',
    });
  }

  ngOnInit() {
  }

  logIn(accountInfo: any) {
    this.showLogInForm = false;
    this.showSpinner = true;
    this.accountManagementSer.logIn(accountInfo).subscribe(
      (res) => {
        this.account = res.Result;
        if (res?.Result != null) {
          let accountrole = this.account?.User_Type;
          switch (accountrole) {
            case 'admin':
              this.router.navigate(['admin']);
              break;
            case 'receptionist':
              this.router.navigate(['receptionist']);
              break;
            case 'entry':
              this.router.navigate(['entry']);
              break;
            case 'diwan':
              this.router.navigate(['diwan']);
              break;
            case 'collage-record':
              this.router.navigate(['collage-record']);
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
}
