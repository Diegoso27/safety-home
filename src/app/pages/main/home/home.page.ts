import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  utilsService = inject(UtilsService);
  
  owner = this.utilsService.getLocalStorage('ownerUID');
  
  title: 'Contactar dueño';
    

  pages = [
    { title: 'Perfil', url: '/main/profile', img: 'assets/profile.png'},
    { title: 'Perfil Niños/as', url: '/main/children', img: 'assets/children.png'},
    { title: 'Tareas', url: '/main/tasks', img: 'assets/tareas.png'},
    { title: 'Procedimientos de Emergencia', url: '/main/emergency-procedures', img: 'assets/tutorial.png' },
  ]

  user = this.utilsService.getLocalStorage('user');

  constructor() { }

  ngOnInit() {
  }

}
