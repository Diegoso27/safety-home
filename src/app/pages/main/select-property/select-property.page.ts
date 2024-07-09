import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Property } from 'src/app/models/property.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddPropertyComponent } from 'src/app/shared/components/add-property/add-property.component';

@Component({
  selector: 'app-select-property',
  templateUrl: './select-property.page.html',
  styleUrls: ['./select-property.page.scss'],
})
export class SelectPropertyPage  {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  user = this.utilsService.getLocalStorage('user');

  loading: boolean = false;

  properties: Property[] = [];
  propiedadesOwner: any[] = [];

  selectedUser: any[] = [];
  
  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  async submit() {
    if (this.form.valid) {
      this.loading = true;
      await this.searchProperties(this.form.value.email);
      console.log(this.propiedadesOwner);
      this.loading = false;
      this.cdr.detectChanges(); // Detecta los cambios y actualiza la vista
    }
  } 


  async searchProperties(email: string) {
    const owner = await this.firebaseService.findUserByTag(email);
    this.utilsService.saveLocalStorage('ownerUID', owner)
    this.propiedadesOwner = await this.firebaseService.getPropertiesFromUser(owner.uid);
  }


  ionViewWillEnter() {
    this.getProperties();
  }

  selectPropetry(property: Property) {
    this.utilsService.saveLocalStorage('property', property);
    this.utilsService.routerLink('main/home');
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
          this.loading = false;
          sub.unsubscribe();
        }
      })
  }
}
