import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirePageRoutingModule } from './fire-routing.module';

import { FirePage } from './fire.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirePageRoutingModule,
    SharedModule
  ],
  declarations: [FirePage]
})
export class FirePageModule {}
