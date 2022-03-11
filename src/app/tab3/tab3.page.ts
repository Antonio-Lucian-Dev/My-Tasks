import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  @ViewChild('mySubNav') myNav: NavController;

  rootPage: any;

  constructor(private router: Router, private navController: NavController,) {
    this.rootPage = Tab3Page;
  }

  ngOnInit(): void {
  }

  public popFromNav() {
    this.myNav.pop();
  }

}
