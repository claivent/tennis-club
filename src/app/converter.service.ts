import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() { }
}

export function unixToTime(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000); // Převod na milisekundy
  const hours = String(date.getUTCHours()).padStart(2, '0'); // Získání hodin
  const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Získání minut
  return `${hours}:${minutes}`; // Vrátí čas ve formátu HH:mm
}

export function timeToUnix(time: string): number {
  const [hours, minutes] = time.split(':').map(Number); // Rozdělí čas na hodiny a minuty
  const date = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), hours, minutes)); // Vytvoří nový datum
  return Math.floor(date.getTime() / 1000); // Převod na Unix timestamp (v sekundách)
}

export function getUnixTimestamp(selectedDate: Date | null, selectedTime: string | null): number | 0 {
  if (!selectedDate || !selectedTime) {
    return 0;
  }

  // Oddělí hodiny a minuty ze selectedTime
  const [hours, minutes] = selectedTime.split(':').map(Number);

  // Nastaví hodiny a minuty do selectedDate
  selectedDate.setHours(hours);
  selectedDate.setMinutes(minutes);

  console.log("getUnixTimestamp",selectedDate,selectedTime, Math.floor(selectedDate.getTime() / 1000));
  // Vrátí UNIX timestamp v sekundách
  return Math.floor(selectedDate.getTime() / 1000);
}

export function fromUnixTimestamp(unixTimestamp: number): {
  selectedDate: Date,
  selectedTime: string } | null {
  if (!unixTimestamp) {
    return null;
  }

  // Vytvoří nový Date objekt z UNIX timestampu
  const date = new Date(unixTimestamp * 1000);

  // Získá hodiny a minuty
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Vrátí selectedDate a selectedTime ve formátu HH:mm
  return {
    selectedDate: date,
    selectedTime: `${hours}:${minutes}`,
  };
}

export function getDate2(date: Date): string{
  return date.toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}


