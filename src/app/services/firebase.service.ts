import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { User } from '../models/user.model';
import { doc, getFirestore, setDoc, getDoc, addDoc, collection } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { forkJoin, map, mergeMap, Observable, of } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsService = inject(UtilsService);

  dataRef: AngularFirestoreCollection<User>;
  userData: User;
  propertiesData: Property[];

  getAuth() {
    return getAuth();
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  updateUser(displayName: any) {
    return updateProfile(getAuth().currentUser, {displayName});
  }
  updateUser2(displayName: any) {
    return updateProfile(getAuth().currentUser, {displayName});
  }

  setDocument(path: any, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }
  
  async getDocument(path: any) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsService.routerLink('/auth');
  }

  addDocument(path: any, data: any) {
    return addDoc(collection(getFirestore(), path),data)
  }

  async updateImg(path: any, data_url: any) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url')
      .then(() => {
        return getDownloadURL(ref(getStorage(), path));
      })
  }

  getCollectionData(path: any): AngularFirestoreCollection<User> {
    this.dataRef = this.firestore.collection(path);
    return this.dataRef;
  }
  // getCollectionData(path: any): AngularFirestoreCollection<User> {
  //   this.dataRef = this.firestore.collection(path, ref => ref.orderBy('uid', 'asc'));
  //   return this.dataRef;
  // }

  buscarPropiedadesPorTag(tag: string) {
    return this.firestore.collection('users/properties', ref => ref.where('tags', 'array-contains', tag)).snapshotChanges();
  }

  async findUserByTag(email: string): Promise<User> {
    return await new Promise((resolve, reject) => {
      this.firestore.collection<User>('users', ref => ref.where('email', '==', email)).snapshotChanges().subscribe(
        users => {
          if (users.length === 0) {
            console.log('No users found');
            of([]);
          }
          console.log(`Found ${users.length} users`);
          console.log('lala');
  
          this.userData = users[0].payload.doc.data();
          resolve(this.userData);
        }
      );
    });
  }

  async getPropertiesFromUser(uid: string): Promise<Property[]> {
    return await new Promise((resolve, reject) => {
      this.firestore.collection<Property>(`users/${uid}/properties`).snapshotChanges().subscribe(
        properties => {
          if (properties.length === 0) {
            console.log('No properties found');
            of([]);
          }
          console.log(`Found ${properties.length} properties`);
  
          this.propertiesData = properties.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            };
          });
          resolve(this.propertiesData);
        }
      );
    });
  };

  addAsesorToPropiedad(userId: string, propiedadId: string, asesorId: string) {
    const propiedadRef = this.firestore.collection(`users/${userId}/properties`).doc(propiedadId);

    return propiedadRef.collection('asesores').doc(asesorId).set({
      asesorId: asesorId
    });
  }


}
