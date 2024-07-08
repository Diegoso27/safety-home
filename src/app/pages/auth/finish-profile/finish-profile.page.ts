import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Property } from 'src/app/models/property.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddPropertyComponent } from 'src/app/shared/components/add-property/add-property.component';

@Component({
  selector: 'app-finish-profile',
  templateUrl: './finish-profile.page.html',
  styleUrls: ['./finish-profile.page.scss'],
})
export class FinishProfilePage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  user = this.utilsService.getLocalStorage('user');

  loading: boolean = false;

  properties: Property[] = [];


  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(12),Validators.maxLength(12)]),
  });

  constructor() { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getProperties();
  }


  async addProperty(property?: Property ) {
    let modal = await this.utilsService.getModal({
      component: AddPropertyComponent,
      cssClass: 'add-update-modal',
      componentProps: { property }
    })
    if (modal) this.getProperties();
  }



  getProperties() {
    let path = `users/${this.user.uid}/properties`;  

    this.loading = true;
    let sub = this.firebaseService.getCollectionData(path)
      .snapshotChanges().pipe(
        map(changes => changes.map(c =>({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        })))
      ).subscribe({
        next: (resp: any) => {
          this.properties = resp;
          console.log(this.properties);
          console.log(sub, 'sub');
          this.loading = false;
          sub.unsubscribe();
        }
      })
      console.log(sub, 'sub')
  }







  }


