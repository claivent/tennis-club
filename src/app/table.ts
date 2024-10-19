export interface Table {
  _id?: string;
  name: string;
  party: string;
  date: number;
  selectedDate: Date;
  selectedTime: string;
  [key: string]: any;
}


