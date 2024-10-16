export interface Table {
  _id?: string;
  name: string;
  party: string;
  time: string;
  date: number;
  [key: string]: any;
}
