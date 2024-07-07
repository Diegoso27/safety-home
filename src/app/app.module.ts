import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from 'firebase/app';


export const firebaseConfig = {
  apiKey: "AIzaSyBvAV8qYK8oNdkb668fKZI3980v6_7dEGE",
  authDomain: "safety-home-97a30.firebaseapp.com",
  projectId: "safety-home-97a30",
  storageBucket: "safety-home-97a30.appspot.com",
  messagingSenderId: "349645951010",
  appId: "1:349645951010:web:d2bc3e2970d0d66c3e7a7b"
};

initializeApp(firebaseConfig);


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
    
  ],


  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
