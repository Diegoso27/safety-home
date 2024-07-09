import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EarthquakePageRoutingModule } from './earthquake-routing.module';

import { EarthquakePage } from './earthquake.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EarthquakePageRoutingModule,
    SharedModule
  ],
  declarations: [EarthquakePage]
})
export class EarthquakePageModule {}
