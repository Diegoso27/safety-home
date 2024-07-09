import { Component, inject, Input } from '@angular/core';
import { EmergencyNumbers } from '../../../models/property.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-list-emergency-numbers',
  templateUrl: './list-emergency-numbers.component.html',
  styleUrls: ['./list-emergency-numbers.component.scss'],
})
export class ListEmergencyNumbersComponent {
  
  utilsService = inject(UtilsService)
  
  propiedad = this.utilsService.getLocalStorage('property')
  
  constructor() { }

  

}
