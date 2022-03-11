import { LocalStorageService } from 'src/app/service/local-storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { toastController } from '@ionic/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo = this.fb.group({
    username: ['', Validators.required]
  });

  constructor(private navController: NavController, public fb: FormBuilder, private memory: LocalStorageService) { }

  ngOnInit(): void {
  }

  public popFromNav() {
    this.navController.back();
  }

  async submit() {
    console.log('intra', this.userInfo.value);
    if (this.userInfo.valid) {
      console.log(this.userInfo.valid);
      localStorage.setItem('username', this.userInfo.get('username').value);
      this.memory.userInfo.emit(this.userInfo.get('username').value);
      const toast = await toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'Username changed successfully!',
        cssClass: 'alert'
      });
      await toast.present();
    }
  }

}
