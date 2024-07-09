import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emergency-procedures',
  templateUrl: './emergency-procedures.page.html',
  styleUrls: ['./emergency-procedures.page.scss'],
})
export class EmergencyProceduresPage implements OnInit {

  pages = [
    { title: 'Incendio', url: '/main/fire', img: 'assets/img/bgIncendio.jpg' },
    { title: 'Sismo', url: '/main/earthquake', img: 'assets/img/bgSismo.webp ' },
    { title: 'Urgencia médica', url: '/main/health', img: 'assets/img/bgSalud.webp' },
  ]

  constructor() { }

  ngOnInit() {
  }

}
