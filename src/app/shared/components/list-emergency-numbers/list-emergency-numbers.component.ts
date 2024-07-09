import { Component, Input } from '@angular/core';
import { EmergencyNumbers } from '../../../models/property.model';

@Component({
  selector: 'app-list-emergency-numbers',
  templateUrl: './list-emergency-numbers.component.html',
  styleUrls: ['./list-emergency-numbers.component.scss'],
})
export class ListEmergencyNumbersComponent {
  @Input() numberList: EmergencyNumbers[]
  
  constructor() { }

  

}
