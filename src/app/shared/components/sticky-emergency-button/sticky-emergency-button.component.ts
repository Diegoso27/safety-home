import { Component, inject, Input } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { ListEmergencyNumbersComponent } from '../list-emergency-numbers/list-emergency-numbers.component';

@Component({
  selector: 'app-sticky-emergency-button',
  templateUrl: './sticky-emergency-button.component.html',
  styleUrls: ['./sticky-emergency-button.component.scss'],
})
export class StickyEmergencyButtonComponent {
  utilsService = inject(UtilsService);

  @Input() numberList: number[] 

  constructor() { }

  


  async onClick() {
    // const list = this.numberList;
    const list = [
      {
        number: 123456,
        name: 'Policia',
        icon: 'add'
      },
      {
        number: 123456,
        name: 'Policia',
        icon: 'mail-outline'
      },
      {
        number: 123456,
        name: 'Policia',
        icon: 'mail-outline'
      }
    ];

    await this.utilsService.getModal({
      component: ListEmergencyNumbersComponent,
      cssClass: 'add-update-modal',
      componentProps: { numberList: list }
    })
    console.log('clicked');
  }
}
