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
  property = this.utilsService.getLocalStorage('property')




  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getChildren();
  }

  async addChild(child?: Children ) {
    let modal = await this.utilsService.getModal({
      component: AddChildComponent,
      cssClass: 'add-update-modal',
      componentProps: { child }
    })
      if (modal) this.getChildren();
  }

  getChildren() {
    let path = `users/${this.user.uid}/properties/${this.property.id}/children`; 
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



}
