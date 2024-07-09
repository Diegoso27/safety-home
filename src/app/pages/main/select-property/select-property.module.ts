import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPropertyPageRoutingModule } from './select-property-routing.module';

import { SelectPropertyPage } from './select-property.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPropertyPageRoutingModule,
    SharedModule
  ],
  declarations: [SelectPropertyPage]
})
export class SelectPropertyPageModule {}
