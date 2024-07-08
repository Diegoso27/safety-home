import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishProfilePageRoutingModule } from './finish-profile-routing.module';

import { FinishProfilePage } from './finish-profile.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishProfilePageRoutingModule,
    SharedModule
  ],
  declarations: [FinishProfilePage]
})
export class FinishProfilePageModule {}
