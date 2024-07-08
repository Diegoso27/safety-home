import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergencyProceduresPageRoutingModule } from './emergency-procedures-routing.module';

import { EmergencyProceduresPage } from './emergency-procedures.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergencyProceduresPageRoutingModule,
    SharedModule
  ],
  declarations: [EmergencyProceduresPage]
})
export class EmergencyProceduresPageModule {}
