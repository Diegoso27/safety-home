import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Property } from 'src/app/models/property.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
})
export class AddPropertyComponent  implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  user = {} as User;


  form = new FormGroup({
    id: new FormControl(''),
    direction: new FormControl('', [Validators.required]),
    commune: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    
  });

  constructor() { }

  ngOnInit() {
    this.user = this.utilsService.getLocalStorage('user');
    console.log(this.user);
  }


  submit() {

    if (this.form.valid) {
      this.addProperty();
    }
  }

  async addProperty() {

    let path = `users/${this.user.uid}/properties`;
    console.log(path);

    const loading = await this.utilsService.loading();
    await loading.present();

    this.firebaseService.addDocument(path, this.form.value)
      .then(async resp => {
        this.utilsService.dismissModal({ success: true })
        this.utilsService.presentToast({
          message: 'Propiedad registrada correctamente',
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'checkmark-circle-outline'
        })

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
