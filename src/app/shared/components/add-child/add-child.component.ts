import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Children } from 'src/app/models/children.model';
import { Property } from 'src/app/models/property.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss'],
})
export class AddChildComponent  implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  user = {} as User;
  property = {} as Property;


  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    rut: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl('', [Validators.required, ]),
    bloodType: new FormControl('', [Validators.required, ]),
    medicalHistory: new FormControl('', [Validators.required, ]),
    medicalInsurance: new FormControl('', [Validators.required, ]),
    allergies: new FormControl('', [Validators.required, ]),
    img: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit() {
    this.user = this.utilsService.getLocalStorage('user');

    this.property = this.utilsService.getLocalStorage('property');
    console.log(this.property);
    console.log(this.property.id);
  }

  submit() {

    if (this.form.valid) {
      this.addChild();
    }
  }
 
 
 
 
 
  async addChild() {

    let path = `users/${this.user.uid}/properties/${this.property.id}/children`;
    
    console.log(this.property.id);
    console.log(path);

    const loading = await this.utilsService.loading();
    await loading.present();


    let dataUrl = this.form.value.img;
    let imgPath = `${this.user.uid}/${Date.now()}`;
    let imgUrl = await this.firebaseService.updateImg(imgPath, dataUrl);
   
    this.form.controls.img.setValue(imgUrl);

    delete this.form.value.id;

    this.firebaseService.addDocument(path, this.form.value)
      .then(async resp => {
        this.utilsService.dismissModal({ success: true })
        this.utilsService.presentToast({
          message: 'Infante registrado correctamente',
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

  async takeImg() {
    const dataUrl = (await this.utilsService.takePicture('Imagen del niño/a')).dataUrl 
    this.form.controls.img.setValue(dataUrl);
  }




}
