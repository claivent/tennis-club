export interface Table {
  _id?: string;
  name: string;
  party: string;
  date: number;
  selectedDate: Date;
  selectedTime: string;
  [key: string]: any;
}

export interface TableOutput {
  _id?: string;
  name: string;
  party: string;
  time: string
  date: 0;
  selectedDate: Date;
  selectedTime: string;
  [key: string]: any;
}
