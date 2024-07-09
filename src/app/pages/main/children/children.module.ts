import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildrenPageRoutingModule } from './children-routing.module';

import { ChildrenPage } from './children.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildrenPageRoutingModule,
    SharedModule
  ],
  declarations: [ChildrenPage]
})
export class ChildrenPageModule {}
