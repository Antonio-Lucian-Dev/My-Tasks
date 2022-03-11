import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit(): void {
  }

  public popFromNav() {
    this.navController.back();
  }

}
