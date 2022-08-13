import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  display: boolean = true;
  // menu=[{
  //   'name':'',
  //   'routerLink':''
  // }]
  constructor() {}

  ngOnInit() {
    // this.menu.forEach(element => {
    //   element.name='home';
    //   element.routerLink='home';
    // });
    // this.menu[0].name='home';
    // this.menu[0].routerLink='home';
    // this.menu[1].name='customers';
    // this.menu[1].routerLink='customers';
  }
}
