import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
selector:'login',
templateUrl:'login.component.html',
styleUrls: ["./login.component.scss"]
})

export class logInComponent{
    showSpinner:boolean=false;
    showLogInForm:boolean=true;
    constructor(private fb:FormBuilder,private router:Router){}
    userForm = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });

    logIn(data:any){
        this.showLogInForm=false;
        this.showSpinner=true;
        this.router.navigate(['main']);
    }
}