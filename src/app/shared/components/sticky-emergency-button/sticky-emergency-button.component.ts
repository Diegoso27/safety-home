import { Component, inject, Input } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { ListEmergencyNumbersComponent } from '../list-emergency-numbers/list-emergency-numbers.component';
import { EmergencyNumbers } from 'src/app/models/property.model';

@Component({
  selector: 'app-sticky-emergency-button',
  templateUrl: './sticky-emergency-button.component.html',
  styleUrls: ['./sticky-emergency-button.component.scss'],
})
export class StickyEmergencyButtonComponent {
  utilsService = inject(UtilsService);

  @Input() numberList: EmergencyNumbers[] 

  constructor() { }

  


  async onClick() {
    const list = this.numberList;


    await this.utilsService.getModal({
      component: ListEmergencyNumbersComponent,
      cssClass: 'add-update-modal',
      componentProps: { numberList: list }
    })
    console.log('clicked');
  }
}
