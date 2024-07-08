import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { LogoComponent } from './components/logo/logo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';



@NgModule({
  declarations: [
    InputComponent,
    LogoComponent,
    HeaderComponent,
    AddPropertyComponent
  ],
  exports: [
    InputComponent,
    LogoComponent,
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule,
    IonicModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SharedModule { }
