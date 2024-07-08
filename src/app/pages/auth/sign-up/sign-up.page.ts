import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(12),Validators.maxLength(12)]),
  });

  constructor() { }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();
      await loading.present();

      this.firebaseService.signUp(this.form.value as User)
        .then(async resp => {
          await this.firebaseService.updateUser(this.form.value.role);
          
          let uid = resp.user.uid;
          this.form.controls.uid.setValue(uid);
          
          this.setUserInfo(uid);

        }).catch(error => {
          console.log(error);
          this.utilsService.presentToast({
            message: error.message,
            duration: 1500,
            color: 'danger',
            position: 'bottom',
            icon: 'alert-circle-outline'
          })
        }).finally(() =>{
          loading.dismiss();
        })
    }
  }

  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();
      await loading.present();


      let path = `users/${uid}`;
      delete this.form.value.password;
      this.firebaseService.setDocument(path, this.form.value)
        .then(async resp => {
          this.utilsService.saveLocalStorage('user', this.form.value);
          this.utilsService.routerLink('/auth/finish-profile');
          this.form.reset();
        }).catch(error => {
          console.log(error);
          this.utilsService.presentToast({
            message: error.message,
            duration: 1500,
            color: 'danger',
            position: 'bottom',
            icon: 'alert-circle-outline'
          })
        }).finally(() =>{
          loading.dismiss();
        })
    }
  }
}
