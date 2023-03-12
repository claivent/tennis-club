import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private _isSmallScreen = new BehaviorSubject<boolean>(false);

  get isSmallScreen() {
    return this._isSmallScreen.asObservable();
  }

  constructor() {
    this.updateIsSmallScreen(window.innerWidth);
    window.addEventListener('resize', () => this.updateIsSmallScreen(window.innerWidth));
  }

  private updateIsSmallScreen(width: number) {
    const isSmallScreen = width < 768;
    this._isSmallScreen.next(isSmallScreen);
  }
}
