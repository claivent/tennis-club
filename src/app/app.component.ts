import { Component, HostListener } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSmallScreen = false;

  onResize(event: Event) {
    const window = event.target as Window;
    const isSmallScreen = window.innerWidth < 768;
  }
}
