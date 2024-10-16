import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getDate(): string {
    const date = new Date();
    if (date.getHours() >= 14) {
      date.setDate(date.getDate() + 1);
    }
    return date.toLocaleDateString('cs-CZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

}
