import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectPropertyPage } from './select-property.page';

const routes: Routes = [
  {
    path: '',
    component: SelectPropertyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectPropertyPageRoutingModule {}
