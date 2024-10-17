import {Component, Output,SimpleChanges, EventEmitter, OnInit, Input} from '@angular/core';
import {getUnixTimestamp, fromUnixTimestamp} from "../../converter.service";

@Component({
  selector: 'app-date-picker2',
  templateUrl: './date-picker2.component.html',
  styleUrls: ['./date-picker2.component.css']
})
export class DatePicker2Component implements OnInit {

  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  unixDate: number = 0;
  timeOptions: string[] = [
    '00:00', '00:30',
    '01:00', '01:30',
    '02:00', '02:30',
    '03:00', '03:30',
    '04:00', '04:30',
    '05:00', '05:30',
    '06:00', '06:30',
    '07:00', '07:30',
    '08:00', '08:30',
    '09:00', '09:30',
    '10:00', '10:30',
    '11:00', '11:30',
    '12:00', '12:30',
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30',
    '17:00', '17:30',
    '18:00', '18:30',
    '19:00', '19:30',
    '20:00', '20:30',
    '21:00', '21:30',
    '22:00', '22:30',
    '23:00', '23:30',
  ];


  constructor() {
    this.selectedDate = new Date();
    this.selectedTime =  new Date().getHours() + ':30';
    console.log('DP-constructor');
    console.log("DP-constructor-selectedDate",this.selectedDate);
    console.log("DP-constructor-selectedTime",this.selectedTime);

  }

  ngOnInit(): void {
    console.log('DP-ngOnInit');
    console.log("DP-ngOnInit-selectedDateFromParent",this.selectedDateFromParent);
    this.unixDate = getUnixTimestamp(this.selectedDate, this.selectedTime);
    // Emit initial values when the component initializes

    setTimeout(() => {
      this.emitDateTime();
    });
  }


  // Function to emit current values FROM the parent
  // Call this function whenever the date or time changes
  @Input() selectedDateFromParent!: any;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDateFromParent']) {
      // Update your internal selectedDate based on parent input
      this.unixDate = changes['selectedDateFromParent'].currentValue;

      // Convert Unix timestamp to Date and Time
      const tmpDate = fromUnixTimestamp(this.unixDate);

      // Ensure tmpDate exists and has the necessary properties
      if (tmpDate) {
        this.selectedDate = tmpDate.selectedDate || null;
        this.selectedTime = tmpDate.selectedTime || '';  // Handle selectedTime default value
      } else {
        console.error("DP-ngOnChanges-tmpDate is null or undefined");
      }
      console.log("DP-ngOnChanges-tmpDate",tmpDate);
      this.emitDateTime();
      console.log("DP-ngOnChanges-selectedDateFromParent",this.selectedDateFromParent)
    }
  }
  /*ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDateFromParent'] && changes['selectedUnixDate'].currentValue) {
      // Zde můžete provést akce po přijetí nových dat
      console.log('Received updated Unix date from parent:', this.selectedUnixDate);
    }*/
  /*ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDateFromParent']) {
      this.selectedDate = changes['selectedDateFromParent'].currentValue;
      this.unixDate = getUnixTimestamp(this.selectedDate, this.selectedTime);
      this.emitDateTime();
    }
  }*/

  // Function to emit current values TO the parent

  @Output() unixChanged = new EventEmitter<number | 0>();

  private emitDateTime() {
    this.unixChanged.emit(this.unixDate);
  }

  onDateChange(newDate: Date) {
    this.selectedDate =  newDate;
    this.unixDate = getUnixTimestamp(this.selectedDate, this.selectedTime);
    this.emitDateTime();
    console.log("DP-selectedDate",this.selectedDate)

  }

  onTimeChange(newTime: string) {
    this.selectedTime = newTime;
    this.unixDate = getUnixTimestamp(this.selectedDate, this.selectedTime);
    this.emitDateTime();
    console.log("DP-selectedDate",this.selectedTime)

  }




}
