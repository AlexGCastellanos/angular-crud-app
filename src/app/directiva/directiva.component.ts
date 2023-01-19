import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {
  listaCurso: string[] = ['📐Angular', '🍃Spring Boot', '☕Java SE', '🧾Spring Data', '💾Hibernate', '💼Jakarta EE', '🟧HTML' , '🟪Bootstrap'];

  habilitar: boolean = true;

  constructor() { };

  setHabilitar() : void {
    this.habilitar = (this.habilitar == true)? false : true;
  }
}
