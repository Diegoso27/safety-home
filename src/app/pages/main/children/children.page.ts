import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Children } from 'src/app/models/children.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddChildComponent } from 'src/app/shared/components/add-child/add-child.component';

@Component({
  selector: 'app-children',
  templateUrl: './children.page.html',
  styleUrls: ['./children.page.scss'],
})
export class ChildrenPage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  children: Children[] = [];

  loading: boolean = false;
  
  user = this.utilsService.getLocalStorage('user');
  property = this.utilsService.getLocalStorage('property');
  ownerUID = this.utilsService.getLocalStorage('ownerUID');



  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getChildren();
  }

  async addChild(child?: Children ) {
    console.log(child);
    let modal = await this.utilsService.getModal({
      component: AddChildComponent,
      cssClass: 'add-update-modal',
      componentProps: { child }
    })
      if (modal) this.getChildren();
  }

  getChildren() {

    let path: string;

    if (this.user.role == 'propietario') {
      
      path = `users/${this.user.uid}/properties/${this.property.id}/children` 
    
    } else if (this.user.role == 'asesor') {

      path = `users/${this.ownerUID.uid}/properties/${this.property.id}/children`

    }

    console.log(path) 

    this.loading = true;
    let sub = this.firebaseService.getCollectionData(path)
      .snapshotChanges().pipe(
        map(changes => changes.map(c =>({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        })))
      ).subscribe({
        next: (resp: any) => {
          this.children = resp;
          console.log(resp);
          console.log(sub, 'sub');
          this.loading = false;
          sub.unsubscribe();
        }
      })
  }




  async deleteChild(child: Children) {
    let path = `users/${this.user.uid}/properties/${this.property.id}/children/${child.id}`

    const loading = await this.utilsService.loading();
    await loading.present();

    let imgPath = await this.firebaseService.getFilePath(child.img);
    await this.firebaseService.deleteFile(imgPath); 



    this.firebaseService.deleteDocument(path)
      .then(async resp => { 

        this.children = this.children.filter(e => e.id !== child.id );

        this.utilsService.presentToast({
          message: 'Infante eliminado correctamente',
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
