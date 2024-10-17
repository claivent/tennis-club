import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  currentDate: Date;
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
  selectedHour: number;
  selectedMinute: number;
  daysInMonth: number[];

  constructor() {
    this.currentDate = new Date(); // aktuální datum
    this.selectedYear = this.currentDate.getFullYear();
    this.selectedMonth = this.currentDate.getMonth();
    this.selectedDay = this.currentDate.getDate();
    this.selectedHour = this.currentDate.getHours();
    this.selectedMinute = Math.floor(this.currentDate.getMinutes() / 15) * 15; // zaokrouhlení na 15 minut
    this.daysInMonth = this.getDaysInMonth(this.selectedYear, this.selectedMonth);

  }

  ngOnInit() {}

  // Funkce pro získání počtu dní v měsíci
  getDaysInMonth(year: number, month: number): number[] {
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  }

  // Změna roku
  changeYear(year: number) {
    this.selectedYear = year;
    this.daysInMonth = this.getDaysInMonth(this.selectedYear, this.selectedMonth);
    if (this.selectedDay > this.daysInMonth.length) {
      this.selectedDay = this.daysInMonth.length; // zajistit, že den je platný
    }
  }

  // Změna měsíce
  changeMonth(month: number) {
    this.selectedMonth = month;
    this.daysInMonth = this.getDaysInMonth(this.selectedYear, this.selectedMonth);
    if (this.selectedDay > this.daysInMonth.length) {
      this.selectedDay = this.daysInMonth.length; // zajistit, že den je platný
    }
  }

  // Změna dne
  changeDay(day: number) {
    this.selectedDay = day;
  }

  // Změna hodiny
  changeHour(hour: number) {
    this.selectedHour = hour;
  }

  // Změna minuty
  changeMinute(minute: number) {
    this.selectedMinute = minute;
  }

  // Generování časových hodnot po 15 minutách
  getTimeSlots(): string[] {
    const timeSlots: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }
    return timeSlots;
  }
}
