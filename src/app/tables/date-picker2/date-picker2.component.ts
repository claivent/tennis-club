import {Component, Output,SimpleChanges, EventEmitter, OnInit, Input} from '@angular/core';
import {getUnixTimestamp} from "../../converter.service";

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





  constructor(

  ) {

    this.selectedDate = new Date();
    this.selectedTime =  new Date().getHours() + ':00';

  }

  ngOnInit(): void {

    // Emit initial values when the component initializes

    this.unixDate = getUnixTimestamp(this.selectedDate, this.selectedTime);
    console.log("PICKER ngOnInit(): void",this.unixDate);
    this.emitDateTime();

  }

 /* ngDoCheck(){
    console.log("doCheck");
  }
  ngAfterContentInit(){
    console.log("afterContentInit");

  }
  ngAfterContentChecked(){
    console.log("afterContentChecked");
  }
  ngAfterViewInit(){
    console.log("afterViewInit");

  }
  ngAfterViewChecked(){
    console.log("afterViewChecked");

  }
  ngOnDestroy(){
    console.log("destroy");
  }*/

  ngOnChanges(changes: SimpleChanges) {

    this.selectedTime = this.selectedTimeFromParent;
    this.unixDate = getUnixTimestamp(this.selectedDate, this.selectedTime);
    console.log("PICKER  ngOnChanges(changes",this.unixDate);
    this.emitDateTime();
  }


  // Call this function whenever the date or time changes
  @Input() selectedTimeFromParent: any = '00:00';
  @Input() selectedDateFromParent!: any;

  // Emitters to send data to the parent
  @Output() dateChanged = new EventEmitter<Date | null>();
  @Output() timeChanged = new EventEmitter<string | null>();
  @Output() unixChanged = new EventEmitter<number | 0>();


  // Function to emit current values to the parent

  emitDateTime(): void {
    this.dateChanged.emit(this.selectedDate);
    this.timeChanged.emit(this.selectedTime);
    this.unixChanged.emit(this.unixDate);

  }

  onDateChange(newDate: Date): void {
    this.selectedDate =  newDate;
    this.unixDate = getUnixTimestamp(this.selectedDate, this.selectedTime);
    console.log("PICKER  onDateChange(newDat",this.unixDate);
    this.emitDateTime();


  }

  onTimeChange(newTime: string): void {
    this.selectedTime =  newTime;
    //this.unixDate = getUnixTimestamp(this.selectedDate, this.selectedTime);
    console.log("PICKER  onDateChange(newDat",this.unixDate);
    this.emitDateTime();


  }



}
