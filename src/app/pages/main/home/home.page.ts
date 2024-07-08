import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pages = [
    { title: 'Perfil', url: '/main/profile', img: 'assets/profile.png'},
    { title: 'Perfil Niños/as', url: '/main/children', img: 'assets/children.png'},
    { title: 'Tutoriales', url: '/main/emergency-procedures', img: 'assets/tutorial.png' },
  ]

  constructor() { }

  ngOnInit() {
  }

}
