import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  display: boolean = true;
  menu = [
    {
      name: 'الادمن',
      routerLink: 'admin',
    },
    {
      name: 'ديوان مركز الخدمة',
      routerLink: 'diwan',
    },
    {
      name: 'ديوان الكلية',
      routerLink: 'collage-record',
    },
    {
      name: 'الامتحانات',
      routerLink: 'exams',
    },
    {
      name: 'موظف الاستقبال',
      routerLink: 'receptionist',
    },
    {
      name: 'شؤون الطلاب',
      routerLink: 'students-affairs',
    },
    {
      name: 'موظف التسليم',
      routerLink: 'delivery',
    },
  ];
  constructor() {}

  ngOnInit() {
  }
}
