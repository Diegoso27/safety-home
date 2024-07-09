import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { LogoComponent } from './components/logo/logo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { AddChildComponent } from './components/add-child/add-child.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { StickyEmergencyButtonComponent } from './components/sticky-emergency-button/sticky-emergency-button.component';
import { ListEmergencyNumbersComponent } from './components/list-emergency-numbers/list-emergency-numbers.component';



@NgModule({
  declarations: [
    InputComponent,
    LogoComponent,
    HeaderComponent,
    AddPropertyComponent,
    AddChildComponent,
    AddTaskComponent,
    StickyEmergencyButtonComponent,
    ListEmergencyNumbersComponent
  ],
  exports: [
    InputComponent,
    LogoComponent,
    FormsModule,
    HeaderComponent,
    StickyEmergencyButtonComponent,
    ListEmergencyNumbersComponent,
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
