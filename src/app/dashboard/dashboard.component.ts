import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pic_dashboard = "/src/assets/img/dashboard.png"
  constructor() { }

  ngOnInit() {
  }

}
